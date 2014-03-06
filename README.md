#Istim-virtualCoin

##API da Moeda virtual da Istim

###Models:

 - Coin: 
  - Atributos:
   
 >     - userId
 >     - cash
</li>

###Serviços oferecidos pela API:
- <b> Create:</b> Cria um novo objeto no modelo coin
 - Modo de uso:
 
   >     create?userId=example

- <b> Destroy:</b> Destrói um objeto do modelo coin
 - Modo de uso:

   >     destroy?userId=example 

- <b> Credit:</b> Credita no cash de um usuário
 - Modo de uso:
  
   >     credit?userId=example&cash=40

- <b> Debit:</b> Debita no cash de um usuário
 - Modo de uso:
 
   >     debit?userId=example&cash=40
