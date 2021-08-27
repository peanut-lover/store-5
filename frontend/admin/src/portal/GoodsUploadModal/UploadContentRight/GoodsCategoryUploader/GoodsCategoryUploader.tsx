import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CategoryAPI from '@src/apis/categoryAPI';
import { styled } from '@src/lib/CustomStyledComponent';
import { UploaderLabel } from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
import { Category } from '@src/types/Category';

interface Props {
  onHandleCategory: (id: number) => void;
  goodsId?: number;
}

// 기본적인 카테고리는 DB에 존재하기 때문에, 해당 에러 메세지가 출력되면 서버가 닫혀있음을 의심해야 합니다!
const FETCH_DATA__ERROR = '서버가 응답하지 않습니다.';

const GoodsCategoryUploader: React.FC<Props> = ({ onHandleCategory, goodsId }) => {
  const [mainCategory, setMainCategory] = useState<number>();
  const [subCategory, setSubCategory] = useState<number>();
  const [categories, setCategories] = useState<Category[]>([]);
  const mainCategories = categories.map((category) => category);
  const subCategories = categories
    .find((category) => category.id === mainCategory)
    ?.categories?.map((c) => {
      return { id: c.id, name: c.name };
    });

  const handleMainCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const id = Number(e.target.value);
      if (isNaN(id)) return;
      setMainCategory(id);
    },
    [categories, onHandleCategory, setMainCategory]
  );

  const handleSubCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const id = Number(e.target.value);
      if (isNaN(id)) return;
      setSubCategory(id);
    },
    [onHandleCategory, subCategories]
  );

  const fetchAllCategory = async (): Promise<Category[]> => {
    const {
      result: { categories },
    } = await CategoryAPI.getAllCategory();
    return categories;
  };

  const fetchCategoryById = async (goodsId: number) => {
    const goodsCategory = await CategoryAPI.getCategoryByGoodsId(goodsId);
    const { id, parent } = goodsCategory.result;
    return { subCategoryId: id, parentId: parent };
  };

  const fetchCategory = async () => {
    try {
      const categories = await fetchAllCategory();
      if (categories.length === 0) throw Error();

      // 상품 등록은 맨 앞에 위치한 부모 카테고리의 자식 카테고리가 기본값 입니다. :)
      const defaultMainCategory = categories[0];
      const defaultSubCategory = defaultMainCategory.categories[0];

      // goodsId가 있다면 상품 수정이므로 상품에 해당하는 카테고리를 기본 카테고리로 설정합니다!
      // 고민 사항
      // 1. let을 사용해서 setMain, Sub의 중복을 방지하기
      // 2. const 쓰기 (유지)
      // 3. fetchCategoryById 대신 컨트롤을 담당하는 네이밍을 가진 함수 만들기?
      if (goodsId) {
        const { subCategoryId, parentId } = await fetchCategoryById(goodsId);
        setMainCategory(parentId);
        setSubCategory(subCategoryId);
      } else {
        setMainCategory(defaultMainCategory.id);
        setSubCategory(defaultSubCategory.id);
      }
      setCategories(categories);
    } catch (e) {
      console.error(FETCH_DATA__ERROR);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (subCategory) onHandleCategory(subCategory);
  }, [subCategory]);

  return (
    <>
      <UploaderLabel>카테고리</UploaderLabel>
      <SelectContainer>
        <MainCategorySelect onChange={handleMainCategory} value={mainCategory}>
          {mainCategories.map((category, i) => (
            <option key={i} value={category.id}>
              {category.name}
            </option>
          ))}
        </MainCategorySelect>
        <SubCategorySelect onChange={handleSubCategory} value={subCategory}>
          {subCategories &&
            subCategories.map((category, i) => (
              <option key={i} value={category.id}>
                {category.name}
              </option>
            ))}
        </SubCategorySelect>
      </SelectContainer>
    </>
  );
};

const SelectContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
`;
const MainCategorySelect = styled('select')`
  width: 48%;
  padding: 0.5rem;
  border-color: lightgray;
`;

const SubCategorySelect = styled('select')`
  width: 48%;
  padding: 0.5rem;
  border-color: lightgray;
`;
export default GoodsCategoryUploader;
