'use client';
import React, { useState } from 'react';
import Input from '../input';
import Button from '../button';
import ProductsContext from '@/store/product-context';
import PopupContext from '@/store/popup-context';
import { useForm } from 'react-hook-form';

type FormInputs = {
  title: string;
  description: string;
  price: number;
  categoryName: string;
  categoryImage: string;
};

const AddProduct: React.FC = () => {
  const { addProduct } = React.useContext(ProductsContext);
  const { closePopup } = React.useContext(PopupContext);

  const [previewImages, setPreviewImages] = useState<string[]>([]); // State for image previews
  const [imageError, setImageError] = useState<string | null>(null); // State for image validation error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const previewURLs = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewURLs);
      setImageError(null);
    }
  };

  const submitHandler = (formData: FormInputs) => {
    if (previewImages.length === 0) {
      setImageError('Please upload at least one image.');
      return;
    }

    const { title, description, price, categoryName, categoryImage } = formData;

    const newProduct = {
      id: Date.now(),
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      price: Number(price),
      description,
      category: {
        id: 0,
        name: categoryName || 'Uncategorized',
        image: categoryImage || '',
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
      },
      images: previewImages,
      isDeleted: false,
    };

    addProduct(newProduct);

    reset();
    setPreviewImages([]);
    closePopup();
  };

  const closeHandler = () => {
    closePopup();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-5 max-h-[80vh] overflow-y-scroll p-5"
    >
      <Input
        {...register('title', { required: 'Title is required' })}
        error={Boolean(errors.title)}
        errorMessage={errors.title?.message || ''}
        id="title"
        name="title"
        label="Product Title"
        type="text"
      />
      <Input
        {...register('description', { required: 'Description is required' })}
        error={Boolean(errors.description)}
        errorMessage={errors.description?.message || ''}
        id="description"
        name="description"
        label="Product Description"
        type="text"
      />
      <Input
        {...register('price', {
          required: 'Price is required',
          valueAsNumber: true,
        })}
        error={Boolean(errors.price)}
        errorMessage={errors.price?.message || ''}
        id="price"
        name="price"
        label="Price"
        type="number"
      />
      <Input
        {...register('categoryName', { required: 'Category Name is required' })}
        error={Boolean(errors.categoryName)}
        errorMessage={errors.categoryName?.message || ''}
        id="categoryName"
        name="categoryName"
        label="Category Name"
        type="text"
      />
      <div>
        <label htmlFor="images">Upload Product Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        {imageError && <p style={{ color: 'red' }}>{imageError}</p>}{' '}
        <div className="image-preview">
          {previewImages.map((image, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-5 pt-5">
        <Button text="Add" />
        <Button text="Close" onClick={closeHandler} />
      </div>
    </form>
  );
};

export default AddProduct;
