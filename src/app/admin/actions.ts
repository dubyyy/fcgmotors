'use server'

import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function uploadToCloudinary(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'drive-nigeria-v2' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url);
      }
    ).end(buffer);
  });
}

export async function addCar(formData: FormData) {
  try {
    const brand = formData.get('brand') as string;
    const model = formData.get('model') as string;
    const year = parseInt(formData.get('year') as string);
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const imageUrls = formData.getAll('imageUrls') as string[];

    if (imageUrls.length === 0) {
      throw new Error('At least one image is required');
    }

    await (prisma.car.create as any)({
      data: { brand, model, year, category, price, imageUrls, description }
    });

    revalidatePath('/admin');
    revalidatePath('/cars');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding car:', error);
    return { success: false, error: error.message };
  }
}

export async function addSparePart(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const partNumber = formData.get('part_number') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const imageUrls = formData.getAll('imageUrls') as string[];

    if (imageUrls.length === 0) {
      throw new Error('Image is required');
    }

    await (prisma.sparePart.create as any)({
      data: { name, partNumber, category, price, imageUrls, description }
    });

    revalidatePath('/admin');
    revalidatePath('/spare-parts');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding spare part:', error);
    return { success: false, error: error.message };
  }
}

export async function getCars() {
  try {
    return await prisma.car.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

export async function getSpareParts() {
  try {
    return await prisma.sparePart.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching spare parts:', error);
    return [];
  }
}
export async function updateCarPrice(id: number, price: string) {
  try {
    await prisma.car.update({
      where: { id },
      data: { price }
    });
    revalidatePath('/admin');
    revalidatePath('/cars');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating car price:', error);
    return { success: false, error: error.message };
  }
}

export async function updateSparePartPrice(id: number, price: string) {
  try {
    await prisma.sparePart.update({
      where: { id },
      data: { price }
    });
    revalidatePath('/admin');
    revalidatePath('/spare-parts');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating spare part price:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteCar(id: number) {
  try {
    await prisma.car.delete({
      where: { id }
    });
    revalidatePath('/admin');
    revalidatePath('/cars');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting car:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteSparePart(id: number) {
  try {
    await prisma.sparePart.delete({
      where: { id }
    });
    revalidatePath('/admin');
    revalidatePath('/spare-parts');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting spare part:', error);
    return { success: false, error: error.message };
  }
}

export async function updateCar(id: number, formData: FormData) {
  try {
    const brand = formData.get('brand') as string;
    const model = formData.get('model') as string;
    const year = parseInt(formData.get('year') as string);
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const imageUrls = formData.getAll('imageUrls') as string[];

    const updateData: any = {
      brand,
      model,
      year,
      category,
      price,
      description
    };

    if (imageUrls.length > 0) {
      updateData.imageUrls = imageUrls;
    }

    await (prisma.car.update as any)({
      where: { id },
      data: updateData
    });

    revalidatePath('/admin');
    revalidatePath('/cars');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating car:', error);
    return { success: false, error: error.message };
  }
}

export async function updateSparePart(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const partNumber = formData.get('part_number') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const imageUrls = formData.getAll('imageUrls') as string[];

    const updateData: any = { 
      name, 
      partNumber, 
      category, 
      price, 
      description 
    };

    if (imageUrls.length > 0) {
      updateData.imageUrls = imageUrls;
    }

    await (prisma.sparePart.update as any)({
      where: { id },
      data: updateData
    });

    revalidatePath('/admin');
    revalidatePath('/spare-parts');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating spare part:', error);
    return { success: false, error: error.message };
  }
}
