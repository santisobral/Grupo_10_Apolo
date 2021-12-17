use  `apoloss`;

delete from products;
alter table products auto_increment=1;


delete from users;
alter table users auto_increment=1;

delete from categories;
alter table categories auto_increment=1;


delete from sizes;
alter table sizes auto_increment=1;


delete from roles;
alter table roles auto_increment=1;



insert into categories(name,deleted) values
("Pelotas",0),("Remeras",0),("Short",0),("Medias",0),("Botines",0),("Accesorios",0);


insert into sizes(size,deleted) values
("small",0),("medium",0),("large",0);



insert into roles(role,deleted) values
("administrador",0),("cliente",0);


insert into products(name,description,price,brand,size_id,category_id,discount,image,gender,deleted) values
("Pelota Adidas","Pelota Adidas Futbol Conect 21",6999,"Adidas",3,1,10,"pelota-adidas.jpg","Hombre",0),
("Pelota Penalty","Pelota Penalty Campo Player Bc",7500,"Penalty",3,1,5,"pelota-penalty.jpg","Mujer",0),
("Pelota Nike","Pelota Nike Futsal Pro",7300,"Nike",3,1,10,"pelota-nike.jpg","Hombre",0),
("Camiseta Oficial","Camiseta Argentina Titular",10000,"Adidas",3,2,10,"Camiseta.jpg","Hombre",0),
("Camiseta Suplente","Camiseta Argentina Suplente",8500,"Adidas",3,2,15,"Camiseta_Alternativa.jpg","Hombre",0),
("Botin Adidas","Botin Copa Sense.4 Multiterreno",35000,"Adidas",2,5,5,"Botin-adidas2.jpg","Mujer",0),
("Botin Umbro","Botin Con Tapones Umbro Futbol",25000,"Umbro",2,5,5,"diadora.jpg","Hombre",0),
("Botin Puma","Botin Puma Ultra 4.3 FG",30000,"Puma",3,5,10,"botin-puma.jpg","Hombre",0),
("Guantes Topper","Guantes Arquera Maestro Li Tooper",3180,"Topper",1,6,10,"guantes-arquero-topper.jpg","Mujer",0),
("Guantes Adidas","Guantes Predator Li Adidas",3500,"Adidas",2,6,10,"Guantes-arquero-naranja.jpg","Hombre",0),
("Botin Adidas","Botin Gamemode Pasto Sintetico",20000,"Adidas",2,5,10,"1636672081211Botin-m.jpg","Mujer",0),
("Gorra Adidas","Gorra de Football RIver Plate",2999,"Adidas",2,6,15,"1636672381921Gorra_mujer.jpg","Mujer",0),
("Short Adidas","Short Muuv Mujer",2500,"Adidas",1,3,5,"1636672975015short-con-calza.jpg","Mujer",0),
("Short under armour","Short Reves Olav Mujer",3000,"Under Armour",1,3,5,"1636673118408short-mujer.jpg","Mujer",0),
("Short Kappa Racing","Short de Racing Kappa Entrenamiento Petroleo",4099,"Kappa",3,3,15,"1636574573878short-de-racing.jpg","Hombre",0),
("Camiseta Oficial de Boca","Camiseta Jugador Oficial Boca Jrs",14490,"Adidas",3,2,10,"camiseta-boca.jpg","Hombre",0),
("Medias Pumas","Medias De Futbol Puma Team Final 21",1050,"Puma",3,4,10,"1638725302214medias-pumas.jpg","Hombre",0),
("Medias Topper","Media De futbol Mujer Topper",1150,"Topper",1,4,5,"1638725801770media-mujer-topper.jpg","Mujer",0),
("Guantes Adidas","Guante de Arquero Adidas Predator Unisex Blanco",6999,"Adidas",1,6,10,"1638727000071guante-arquero-predator.jpg","Hombre",0),
("Camiseta De Boca Mujer","Camiseta De Boca Oficial Mujer Azul",10550,"Adidas",1,2,5,"1638727336557Camiseta-boca-mujer.jpg","Mujer",0),
("Camiseta De River Mujer","Camiseta De River Oficial Mujer Blanca",10550,"Adidas",1,2,5,"1638730562987camiseta-river-mujer.jpg","Mujer",0),
("Canillera Futbol Topper","Canilleras De Futbol Topper Titanium Azul",2599,"Topper",3,6,15,"1638730835034canillera-de-futbol-topper.jpg","Hombre",0),
("Canillera Futbol Umbro","Canilleras De Futbol Umbro Neo Minimius Blanca",2445,"Umbro",1,6,5,"1638731163227canilleras-de-futbol-umbro-mujer.jpg","Mujer",0),
("Gorra Puma","Gorra Puma CAI Unisex",3455,"Puma",2,6,5,"1638731904627Gorra-independiente.jpg","Hombre",0);


insert into users(name,lastname,birthdate,email,pass,role_id,avatar,deleted) values
("Martin","Castro","1988-02-20","martincastro88@hotmail.com","$2a$10$.DmG6clBMdKYL1PZlh7ViuMesiKc3.jE6skQmKYib1WfadgT34c2W",1,"1637109368261Avatar.jpg",0),
("Cliente","Usuario","1995-12-25","cliente@hotmail.com","$2a$10$PhRkUEppiuKvL6KdR4bUJe0orFOV0/Ywpw/tEv6.n6S5nuqxyecUe",2,"1638021013761avatar-mujer.jpg",0),
("Santiago","Sobral","1992-01-13","santiago@gmail.com","$2a$10$zt2DU4D/uhT4v5EfXXvNquytl6MHYA8Qo7DCADPCiqrc8xg7yTPxq",1,"1638816061312Avatar.jpg",0),
("Emiliano","Canellada","1998-07-17","emiliano@gmail.com","$2a$10$0NsMjXXXdg4z61jJsvdwxeLmUtULB37gL/pXt.Y6L0xHbfSx/IibK",1,"1638816061312Avatar.jpg",0)
