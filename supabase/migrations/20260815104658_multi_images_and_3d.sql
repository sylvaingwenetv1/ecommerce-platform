alter table products add column images text[] default '{}';

create policy "authenticated_upload_product_3d"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-3d');

create policy "public_read_product_3d"
on storage.objects for select
using (bucket_id = 'product-3d');

create policy "owner_delete_own_product_3d"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-3d' and owner = auth.uid());
