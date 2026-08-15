insert into categories (name_fr, name_en) values
  ('Sculptures', 'Sculptures'),
  ('Poterie', 'Pottery'),
  ('Peinture', 'Painting'),
  ('Textile', 'Textile'),
  ('Bijoux', 'Jewelry');

create policy "authenticated_upload_product_images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

create policy "public_read_product_images"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "owner_delete_own_product_images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images' and owner = auth.uid());
