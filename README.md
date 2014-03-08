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
   >     create?userId=example&cash=40

- <b> Destroy:</b> Destrói um objeto do modelo coin
 - Modo de uso:

   >     destroy?userId=example 

- <b> Credit:</b> Credita no cash de um usuário
 - Modo de uso:
  
   >     credit?userId=example&cash=40

- <b> Debit:</b> Debita no cash de um usuário
 - Modo de uso:
 
   >     debit?userId=example&cash=40

- <b> Update:</b> Atualiza informações de um usuário
 - Modo de uso:
 
   >     update?userId=example&cash=50
   >     update?userId=example&newUser=example2
   >     update?userId=example&cash=50&newUser=example2

- <b> Show:</b> Mostra informações a partir de um userId
 - Modo de uso:
 
   >     show?userId=example



##Deploy no NodeJitsu

- http://virtual-coin-api.jit.su/
