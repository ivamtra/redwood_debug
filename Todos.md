[green]: #4eff00

# Gamalt


-Form componentar (Komið)
-Bæta við ehv styling svo hægt er að horfa á þetta
- Button componentar (Komið)
- CSS á Button componentinn til að merkja að hann hafi verið smelltur
- Bæta flagg-takka við Question/Answer componenta. (Komið)
  -Þegar ýtt er á flaggið opnast gluggi sem tekur inn upplýsingar um vandamál
    - 1) Getur verið ný slóð
    - 2) Getur verið pop up

-Verkefnalýsingar fyrir fiverr

---
# 13. Júli

- Hægt að upvote-a tvisvar til að losna við ratingið ✅
  - Laga það að það þurfi að refresha til að fá fulla virkni ✅
  - Gera það fyrir comment ✅

- Gera trjáreikniritið O(n) með hashMap ✅

-Birta comment componenta í réttri röð ✅
  - Bæta við level attribute við hvert comment þannig hægt er að indenta rétt ✅
  - Bæta við refetch queries þegar maður commentar (Laga)


---
# 19. júlí

- <span style="color:red">SLEPPT</span>
  - Laga delete þannig það fari í nýja töflu.
  - Töflur fyrir eydd gögn
  - Page fyrir eydd/falin gögn sem bara adminar geta séð <br>

<br>

- Kommentakerfi lagað, þarf ekki lengur að refresha ✅

- RBAC
  - Leyfa admin/moderator að fela gögnum frá userum  ✅
    - Pæla í delete virkni seinna
  - Virkni fyrir newUser  ✅
  - Componentar eru filteraðir og venjulegir userar sjá ekki falin gögn  ✅

<br>

- Shadowbanned notandi verður property en ekki role ✅
  - Allt sem shadowbanned notandi postar er hidden ✅
  - Allir notendur sjá sína hidden posta ✅

<br>

- Hidden property í component töflum ✅


<br>

- Laga síðuna þannig hún virki ef maður er ekki loggaður inn ✅

<br>



- User page/component svo admin/mod getur shadowbannað/breytt role hjá viðkomandi

<br>

- Búa til script sem resettar dbAuth

<br>






- CSS á hidden componenta þannig adminar sjá að hann er falinn
  - Basic CSS Komið ✅

<br>

- Disable forms fyrir admina þegar isHidden er true
  - Getum leyft shadowbönnuðum að commenta á sín eigin post til að það
    sjáist ekki að það hafi verið disabled


<br>

- Translations Cell fyrir Answer ✅

# 25. júlí

- Notification kerfi
  - Alltaf þegar einhverju er svarað fær höfundur notification sem vísar í svarið ✅
  - Virkar fyrir svar við spurningu ✅
  - Virkar fyrir athugasemd við svar ✅
  - Virkar fyrir athugasemd við spurningu ✅
  - Virkar fyrir svar við athugasemd ✅
  - Link frá notification að svarinu ✅
  - User fær ekki notification frá sjálfum sér ✅
    - Focus á svarið með useRef ✅
    - Pulse animation með CSS þegar focusað er
  - Filtera þannig notandi fær ekki notification frá sjálfum sér ✅

<br>

- QuestionComment component
  - Kominn með fulla virkni ✅


<br>

  - Refactora ratingButton 🟡
    - Betra núna

<br>

- Svar birtist nú strax þegar maður svarar spurningu ✅

- Svör og spurningar birtast í tímaröð ✅
  - Getum raðað eftir vinsældum seinna

<br>

- Leyfa notanda að svara sinni eigin spurningu?
  - Getur verið gagnlegt ef hann finnur eitthvað svar


<br>

---

## Linkar

- Svar við spurningu virkar ✅
- Athugasemd við svar virkar ✅
- Reply virkar fyrir answerComment ✅
- Reply virkar fyrir questionComment ✅

---

<br>

- Refresh í NotificationPage brýtur síðuna (Lagað) ✅



- Favicon

---

- Issue cell byrjað fyrir admina/moderatora
  - Private síða sem aðeins þeir hafa aðgang að ✅
  - Inniheldur hlekk að componentum ✅
  - Inniheldur upplýsingar um vandamálið, hver senti það inn og hvenær ✅
  - Settar inn í tímaröð ✅

<br>

- Rating button er nú blár eða rauður eftir því hvort að það sé upvote eða downvote frá notanda ✅

- Rating liturinn vistast nú hjá hverjum notanda þannig hann fer ekki ef notandinn fer af síðunni ✅

- Basic Issue styling ✅

- Basic Notification styling ✅
  - Bjalla sem sýnir fjölda notification-a ✅
<br>


- Sorta spurningar eftir vinsældum / hot / new etc.

<br>


- QuestionPage er ennþá til þótt að spurning hafi verið falin þannig það er hægt að fara inn á hana með url
  - Redirect aftur á questionpage?
  - Öðruvísi styling fyrir síðuna fyrir venjulega usera til að sýna að spurning er ekki lengur til en adminar sjá ennþá componentinn eins og hann er

<br>


- Hide virkni fyrir nýja comment componentinn

<br>

- Question title í URL
  - Titill verður þá að vera unique sem þýðir aðeins ein spurning fyrir hvert orð
  - Vont að nota route params því notification og issue nota það

<br>

- Seen virkni í notification sem gerir notification component daufari ef hann hefur verið séður ✅

- Spurning hvort að notification er seen ef maður skoðar notification-in sín eða þegar maður opnar sérhvert notification
  - Útfærði bæði þarf bara að velja á milli ✅

<br>

- Leið til að tengja saman comment í viðmótinu t.d. með línum


<br>

- Header navbar

- Search bar ✅
