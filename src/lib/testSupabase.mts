import { supabase } from './supabaseClient';

async function fetchAffiliates() {
  const { data, error } = await supabase
    .from('affiliates')
    .select('*');

  if (error) {
    console.error('Fetch Error:', error.message);
  } else {
    console.log('Affiliate Records:', data);
  }
}

fetchAffiliates();














