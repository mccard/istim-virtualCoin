>#Istim-virtualCoin

>##API da Moeda virtual da Istim

###Models:

 - Coin: 
 >		-Atributos:   - userId
 			        	- cash 
</li>
###Serviços oferecidos pela API:

- Create: Cria um novo objeto no modelo coin
>	- Modo de uso: create?userId=example

- Destroy: Destrói um objeto do modelo coin
>	- Modo de uso: destroy?userId=example

- Credit: Credita no cash de um usuário
>	- Modo de uso: credit?userId=example&cash=40

- Debit: Debita no cash de um usuário
>	- Modo de uso: create?userId=example