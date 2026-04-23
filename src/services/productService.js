import { supabase } from './supabase.js';

const TABLE_NAME = 'products';
const BUCKET_NAME = 'product-images';

export const uploadImagePayload = async (file) => {
  if (!file) return { success: false, error: "NO TARGET FILE DETECTED." };
  try {
    const filename = `ARCHIVE_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, file);

    if (error) throw error;

    // Get permanent public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    console.error("Storage upload failed:", error);
    return { success: false, error: error.message };
  }
};

export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Product fetch failed:", error);
    return [];
  }
};

export const addProduct = async (productData) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([productData])
      .select();

    if (error) throw error;
    return { success: true, id: data[0].id };
  } catch (error) {
    console.error("Product insertion failed:", error);
    return { success: false, error: error.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', productId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Product deletion failed:", error);
    return { success: false, error: error.message };
  }
};
