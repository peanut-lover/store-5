import { Goods } from './../entity/Goods';
import { OrderItem } from './../entity/OrderItem';
import { CreateOrderBody } from './../types/request/order.request';
import { OrderList } from '../entity/OrderList';
import { OrderListRepository } from '../repository/order.list.repository';
import { OrderItemRepository } from '../repository/order.item.repository';
import { GoodsRepository } from '../repository/goods.repository';
import { BadRequestError } from '../errors/client.error';
import { INVALID_DATA } from '../constants/client-error-name';
import { GetAllOrderByUserIdProps, OrderGoods } from '../types/Order';
import {
  GetOrderListResponse,
  OrderListPaginationResponse,
  OrderListWithThumbnail,
} from '../types/response/order.response';
import { getTotalPage, pagination } from '../utils/pagination';
import { PaginationProps } from '../types/Pagination';

type OrderGoodsInfo = OrderItem & {
  goods: Goods;
};

async function getOrders(userId: number): Promise<GetOrderListResponse> {
  const ordersResponse: GetOrderListResponse = [];
  const orders = await OrderListRepository.getOrders(userId);
  await Promise.all(orders.map((order) => processGetOrderData(order, ordersResponse)));
  return ordersResponse;
}

async function getOrdersPagination(
  { page, limit }: GetAllOrderByUserIdProps,
  userId: number
): Promise<OrderListPaginationResponse> {
  const totalCount = await OrderListRepository.getOwnOrderTotalCount(userId);

  const newPage = Math.min(getTotalPage(totalCount, limit), page);

  const option: PaginationProps = {
    offset: pagination.calculateOffset(newPage, limit),
    limit,
  };
  const orders = await OrderListRepository.getOwnOrdersPagination(option, userId);

  const processedOrderList: OrderListWithThumbnail[] = [];
  await Promise.all(orders.map((order) => processGetOrderData(order, processedOrderList)));
  return {
    meta: {
      page: newPage,
      limit,
      totalPage: getTotalPage(totalCount, limit),
      totalCount,
    },
    orderList: processedOrderList,
  };
}

async function createOrder(userId: number, body: CreateOrderBody): Promise<OrderList> {
  const goodsList = [...body.goodsList];
  const newBody = JSON.parse(JSON.stringify({ ...body }));
  delete newBody.goodsList;
  const orderList = await OrderListRepository.createOrder(userId, newBody);
  await Promise.all(goodsList.map((orderedItem) => createOrderItem(orderedItem, orderList.id)));
  return orderList;
}

async function createOrderItem(orderedItem: OrderGoods, orderListId: number): Promise<void> {
  const goods = await GoodsRepository.findGoodsDetailById(orderedItem.id);
  if (!goods) throw new BadRequestError(INVALID_DATA);
  const { price, discountRate, state } = goods;
  await OrderItemRepository.createOrderItem(goods.id, orderListId, {
    price,
    discountRate,
    state,
    amount: orderedItem.amount,
  });
}

// TODO: (jiho) 함수형으로 리팩토링 필요해보이는 코드
async function processGetOrderData(order: OrderList, ordersResponse: GetOrderListResponse) {
  const orderItems = await OrderItemRepository.getAllOrderItemByListId(order.id);
  if (orderItems.length < 1) throw new BadRequestError(INVALID_DATA);
  const orderItemInfo = (await OrderItemRepository.findOrderGoodsInfoById(orderItems[0].id)) as OrderGoodsInfo;
  if (!orderItemInfo) throw new BadRequestError(INVALID_DATA);
  const count = orderItems.length - 1;
  const title = `${orderItemInfo.goods.title}외 ${count}건 주문`;
  const thumbnailUrl = orderItemInfo.goods.thumbnailUrl;
  ordersResponse.push({ ...order, title, thumbnailUrl });
}

export const OrderService = {
  getOrders,
  getOrdersPagination,
  createOrder,
};
