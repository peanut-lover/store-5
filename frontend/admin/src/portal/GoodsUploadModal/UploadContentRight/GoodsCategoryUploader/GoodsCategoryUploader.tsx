import CategoryAPI from '@src/apis/categoryAPI';
import { styled } from '@src/lib/CustomStyledComponent';
import { UploaderLabel } from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
import { Category } from '@src/types/Category';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
interface Props {
  onHandleCategory: (id: number) => void;
}

const GoodsCategoryUploader: React.FC<Props> = ({ onHandleCategory }) => {
  const [mainCategory, setMainCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const mainCategories = categories.map((category) => category.name);
  const subCategories = categories
    .find((category) => category.name === mainCategory)
    ?.categories?.map((c) => {
      return { id: c.id, name: c.name };
    });

  const handleMainCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setMainCategory(e.target.value);
      const id = categories.find((category) => e.target.value === category.name)?.id;
      if (id) onHandleCategory(id);
    },
    [categories, onHandleCategory, setMainCategory]
  );

  const handleSubCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (subCategories) {
        const id = subCategories.find((category) => e.target.value === category.name)?.id;
        if (id) onHandleCategory(id);
      }
    },
    [onHandleCategory, subCategories]
  );

  useEffect(() => {
    const fetchCategory = async () => {
      const {
        result: { categories },
      } = await CategoryAPI.getAllCategory();
      if (categories.length > 0) {
        const parentCategories = categories;
        // 최초에는 맨 앞의 부모 카테고리의 자식 카테고리가 기본으로 선택되어야 합니다 :)
        const defaultParentCategory = parentCategories[0];
        setMainCategory(defaultParentCategory.name);
        if (defaultParentCategory.categories) {
          const defaultChildCategory = defaultParentCategory.categories[0];
          onHandleCategory(defaultChildCategory.id);
        } else {
          onHandleCategory(defaultParentCategory.id);
        }
      }
      setCategories(categories);
    };

    try {
      fetchCategory();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <UploaderLabel>카테고리</UploaderLabel>
      <SelectContainer>
        <MainCategorySelect onChange={handleMainCategory}>
          {mainCategories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </MainCategorySelect>
        <SubCategorySelect onChange={handleSubCategory}>
          {subCategories &&
            subCategories.map((category, i) => (
              <option key={i} value={category.name}>
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
