# simpadk
Sistem Informasi Management Penjualan Air Minum Dalam Kemasan
=============================================================
changelog:13 sept
-update sp: "update sql.txt"
-update postman: check folder postman, import to postman
-update api: now cover:user,product,brand,unit,customer, customer_price, oredr,order_item.

changelog:16 sept
-add feature:
	-changepassword> url POST:localhost:3000/api/[apikey]/users/changepassword field: user_id, old_password, new_password 
	-dashboard
		-sales> url GET:localhost:3000/api/[apikey]/dashboards/saleswidget
		-delivery status> url GET:localhost:3000/api/[apikey]/dashboards/delivery
		-stock> url GET:localhost:3000/api/[apikey]/dashboards/stock
-check folder updates for new & updated stored procedure
		
api documentation
=================
Products
=========
1.List Product (/w paging)
	GET:localhost:3000/api/[key]/products/:product_id/:page
	*pastikan :product_id = 0
2.Detail product 
	GET:localhost:3000/api/[key]/products/:product_id
3.List product untuk dropdown di form
	GET:localhost:3000/products
4.Insert/Update Products
	POST:localhost:3000/api/[key]/products
	kalau product_id = 0 berarti insert, kalau product_id>0 berarti update
	Field POST: product_id(int),merk_id(int),satuan_id(int),product_name(nvarchar(100)),remarks(text),isactive(bit)
5.Delete Products
	DELETE:localhost:3000/api/[key]/products/:product_id/:permanent
	untuk delete, /products/id_product/permanent permanent=0 cuma isactive=0 aja, kalau permanent=1 maka dihapus

LOGIN first to get apikey, apikey will be expired after 2 hours of no usage
===============
[POST]localhost:3000/login/
field POST:user_nama, password

ada tambahan controller baru, brand, unit, user