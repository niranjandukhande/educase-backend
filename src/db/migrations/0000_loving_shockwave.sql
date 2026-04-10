CREATE TABLE `schools` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`address` varchar(1024) NOT NULL,
	`latitude` float NOT NULL,
	`longitude` float NOT NULL,
	CONSTRAINT `schools_id` PRIMARY KEY(`id`)
);
