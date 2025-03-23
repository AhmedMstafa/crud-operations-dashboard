'use client';
import React, { useEffect, useState } from 'react';
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
};

const UpdateProduct: React.FC = () => {
  const { editProduct, selectedProduct } = React.useContext(ProductsContext);
  const { productId, closePopup } = React.useContext(PopupContext);

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

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
      });
      setPreviewImages(selectedProduct.images);
      setImageError(null);
    }
  }, [selectedProduct, reset]);

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

    const { title, slug, price, description, categoryName, categoryImage } =
      formData;

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
      images: previewImages,
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
      className="flex flex-col gap-5 max-h-[80vh] overflow-y-scroll p-5"
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
        <Button text="Update" />
        <Button text="Close" onClick={closeHandler} />
      </div>
    </form>
  );
};

export default UpdateProduct;
