import { CategoryAPI } from '@src/apis/categoryAPI';
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
        setMainCategory(categories[0].name);
        onHandleCategory(categories[0].id);
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
  margin-bottom: 24px;
`;
const MainCategorySelect = styled('select')`
  width: 40%;
  margin-right: 12px;
`;

const SubCategorySelect = styled('select')`
  width: 40%;
`;
export default GoodsCategoryUploader;
