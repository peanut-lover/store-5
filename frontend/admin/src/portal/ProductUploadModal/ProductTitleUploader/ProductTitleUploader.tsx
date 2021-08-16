import React from 'react';

interface Props {
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProductTitleUploader: React.FC<Props> = ({ title, onChangeTitle }) => {
  return (
    <div>
      <label>Title 입력창</label>
      <input type='text' maxLength={30} value={title} onInput={onChangeTitle}></input>
    </div>
  );
};

export default ProductTitleUploader;
