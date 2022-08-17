
# Uppsetning á síðunni
### Forkröfur:
- node: ">=14.19 <=16.x"
- yarn: ">=1.15"

## 1
Keyrðu
```
yarn install
````
til að fá öll dependency

<br>

## 2
Keyrðu
```
yarn rw prisma migrate dev
```
og
````
yarn rw setup auth dbAuth
````
til að upphafsstilla gögn og auðkenningu

## 3
Keyrðu nú
````
yarn rw dev
`````
til að opna dev serverinn. <br>
Hann ætti að opnast sjálfkrafa í <a>localhost:8910</a>
## 4
Ef þessi villa kemur:

<img src="./web/public/appVilla.png" alt="Villa">

Skaltu eyða fyrstu línunni í App.js

<br>

# Admin accountar
Þessi síða kemur með tvem tilbúnum aðgöngum:

### 1. Admin
- user: admin
- password: admin

### 2. Moderator
- user: moderator
- password: moderator


<br>

# Gagnagrunnur
Hægt er að keyra
````
yarn rw prisma studio
`````
til að skoða gagnagrunninn. Skipunin ætti að opna slóð í <a>localhost:5555</a> þar sem hægt er að skoða gögnin.
