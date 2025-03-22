'use client';
import React from 'react';
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
  images: string;
};

const AddProduct: React.FC = () => {
  const { addProduct } = React.useContext(ProductsContext);
  const { closePopup } = React.useContext(PopupContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const submitHandler = (formData: FormInputs) => {
    const { title, description, price, categoryName, categoryImage, images } =
      formData;

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
      images: images.split(',').map((url: string) => url.trim()),
      isDeleted: false,
    };

    addProduct(newProduct);

    reset();
    closePopup();
  };

  const closeHandler = () => {
    closePopup();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="border max-h-90 overflow-y-scroll p-5"
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
      <Input
        {...register('categoryImage', {
          required: 'Category Image is required',
          pattern: {
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, // Regex to validate image file extensions
            message: 'Invalid image URL',
          },
        })}
        error={Boolean(errors.categoryImage)}
        errorMessage={errors.categoryImage?.message || ''}
        id="categoryImage"
        name="categoryImage"
        label="Category Image URL"
        type="text"
      />
      <Input
        {...register('images', {
          required: 'Images are required',
          validate: (value) => {
            const urls = value.split(',').map((url) => url.trim());
            const regex =
              /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            return urls.every((url) => regex.test(url)) || 'Invalid image URLs';
          },
        })}
        error={Boolean(errors.images)}
        errorMessage={errors.images?.message || ''}
        id="images"
        name="images"
        label="Product Images (comma-separated URLs)"
        type="text"
      />
      <div className="flex justify-center gap-5 pt-5">
        <Button text="Add" />
        <Button text="Close" onClick={closeHandler} />
      </div>
    </form>
  );
};

export default AddProduct;
