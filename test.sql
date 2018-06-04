CREATE TABLE salesreport (
	idx INT(11) NOT NULL AUTO_INCREMENT,
	item_name VARCHAR(50) NOT NULL,
	number_of_order INT(11) NOT NULL DEFAULT '0',
	order_amount INT(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (idx)
)
COLLATE='utf8_general_ci'
;