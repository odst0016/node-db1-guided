-- getting data from database

SELECT * FROM Employees;

SELECT Firstname, lastname, employeeid FROM Employees;

SELECT customername, city, country FROM Customers;

SELECT customername, city, country FROM Customers WHERE country = 'France'

SELECT country, city, customername from Customers ORDER BY country, city, customername

select * from products order by price desc;
-- depending on dms one of these
select * 
from products 
order by price 
limit 5;

select top 5 * 
from products 
order by price ;

--adding data to DATABASE

INSERT 
INTO shippers (shipperName, phone)
VALUES ('Lambda Shipping', '(123) 555-1212');

--how to delete always do a where first to verify data

DELETE FROM [SHIPPERS]
WHERE SHIPPERID = 3;

--Update a record

UPDATE shippers
SET phone = '(321) 555-1212', ShipperName = 'LS Parcel'
WHERE ShipperID = 3