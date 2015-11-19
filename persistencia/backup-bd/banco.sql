CREATE DATABASE despesas_diarias;
DROP TABLE pagamentos;
CREATE TABLE pagamentos(
	pdata date,
	unidade_gestora varchar(30),
	favorecido varchar(50),
	valor numeric
);
--Usar no terminal
--CREATE TABLE pagamentos(pdata date,unidade_gestora varchar(30),favorecido varchar(50),valor numeric);
SELECT * FROM pagamentos;
