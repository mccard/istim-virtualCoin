[![Build Status](https://travis-ci.org/mccard/istim-virtualCoin.svg?branch=master)](https://travis-ci.org/mccard/istim-virtualCoin)
#Istim-virtualCoin

Coin manager API for the Istim Gaming Platform.

##Deploy no NodeJitsu

- http://virtual-coin-api.jit.su/

##Serviços oferecidos pela API:
### Coin
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

## Dependências
### User API
  - Authentication


## Exemplo de coin

``` 

   var coin = {
    userId: "usuario1",
    cash: "5000"
  };
```
