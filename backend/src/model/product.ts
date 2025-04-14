import mongoose from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description?: string;
  price?: number;
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: String,
  originalName: String,
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
  category: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    default: null,
  },
  image: {
    type: imageSchema,
    required: true,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
