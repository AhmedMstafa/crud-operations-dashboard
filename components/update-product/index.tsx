'use client';
import React, { useEffect } from 'react';
import Input from '../input';
import Button from '../button';
import ProductsContext from '@/store/product-context';
import PopupContext from '@/store/popup-context';
import { useForm } from 'react-hook-form';

type FormInputs = {
  title: string;
  slug: string;
  price: number;
  description: string;
  categoryName: string;
  categoryImage: string;
  images: string;
};

const UpdateProduct: React.FC = () => {
  const { editProduct, selectedProduct } = React.useContext(ProductsContext);
  const { productId, closePopup } = React.useContext(PopupContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      slug: '',
      price: 0,
      description: '',
      categoryName: '',
      categoryImage: '',
      images: '',
    },
  });

  useEffect(() => {
    if (selectedProduct) {
      reset({
        title: selectedProduct.title,
        slug: selectedProduct.slug,
        price: selectedProduct.price,
        description: selectedProduct.description,
        categoryName: selectedProduct.category.name,
        categoryImage: selectedProduct.category.image,
        images: selectedProduct.images.join(', '),
      });
    }
  }, [selectedProduct, reset]);

  const submitHandler = (formData: FormInputs) => {
    const {
      title,
      slug,
      price,
      description,
      categoryName,
      categoryImage,
      images,
    } = formData;

    if (!productId) {
      console.error('Product ID not available.');
      return;
    }

    const updatedProduct = {
      title,
      slug,
      price: Number(price),
      description,
      category: {
        id: selectedProduct?.category.id || 0,
        name: categoryName,
        image: categoryImage,
        slug,
      },
      images: images.split(',').map((url: string) => url.trim()),
    };

    editProduct(Number(productId), updatedProduct);
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
        error={!!errors.title}
        errorMessage={errors.title?.message || ''}
        id="title"
        name="title"
        label="Product Title"
        type="text"
      />
      <Input
        {...register('slug', { required: 'Slug is required' })}
        error={!!errors.slug}
        errorMessage={errors.slug?.message || ''}
        id="slug"
        name="slug"
        label="Product Slug"
        type="text"
      />
      <Input
        {...register('price', {
          required: 'Price is required',
          valueAsNumber: true,
        })}
        error={!!errors.price}
        errorMessage={errors.price?.message || ''}
        id="price"
        name="price"
        label="Price"
        type="number"
      />
      <Input
        {...register('description', { required: 'Description is required' })}
        error={!!errors.description}
        errorMessage={errors.description?.message || ''}
        id="description"
        name="description"
        label="Product Description"
        type="text"
      />
      <Input
        {...register('categoryName', { required: 'Category Name is required' })}
        error={!!errors.categoryName}
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
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, // Validate URLs
            message: 'Invalid URL format',
          },
        })}
        error={!!errors.categoryImage}
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
            return (
              urls.every((url) => regex.test(url)) ||
              'One or more URLs are invalid'
            );
          },
        })}
        error={!!errors.images}
        errorMessage={errors.images?.message || ''}
        id="images"
        name="images"
        label="Product Images (comma-separated URLs)"
        type="text"
      />
      <div className="flex justify-center gap-5 pt-5">
        <Button text="Update" />
        <Button text="Close" onClick={closeHandler} />
      </div>
    </form>
  );
};

export default UpdateProduct;
