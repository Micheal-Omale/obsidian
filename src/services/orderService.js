import { supabase } from './supabase.js';

export const submitOrder = async (orderData) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();

    if (error) throw error;
    return { success: true, id: data[0].id };
  } catch (error) {
    console.error("Order submission failed:", error);
    return { success: false, error: error.message };
  }
};

export const getOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Order fetch failed:", error);
    return [];
  }
};
