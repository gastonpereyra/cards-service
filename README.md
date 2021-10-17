# Profile Cards Service :credit_card:

![Profile Cards Banner](https://user-images.githubusercontent.com/39351850/133937678-28adceb4-db43-419e-8e3f-cd087b1209bf.png)

## Description :feather:

For create Cards as SVG-Images to use in the Github Profile

## API :telephone_receiver:

* Base URL: `rgp-cards-service.vercel.app`

### User :bust_in_silhouette:
#### Stats 📈

* 🔗 `/api/user/{username}`

![imagen](https://user-images.githubusercontent.com/39351850/137608185-882b5406-5fc3-4f67-9202-4bc4a87043b3.png)

<details>

* Path Paramenters 🆔
    * `username`: _string_
* Query Parameters ❔
    * `width` : _number_ 
    * `lineHeigth`: _number_ 
    * `hideTitle` : _true | false_
    * `hideBorders`: _true | false_
    * `hideYear`: _true | false_
    * `hide` : _stars | commits | issues | prs | contributions_ 
    * `showIcons`: _true | false_
    * `includeAlCommits`: _true | false_
    * `theme` : _dark | light | error_
    * `iconColor` : _string_
    * `titleColor` : _string_
    * `textColor` : _string_
    * `backgroundColor` : _string_

</details>

#### Language Ranking 🔝

* 🔗 `/api/user/{username}/languages`

![imagen](https://user-images.githubusercontent.com/39351850/137608459-03625272-33dc-4231-a9aa-930c4c4ea02d.png)

<details>

* Path Paramenters 🆔
    * `username`: _string_
* Query Parameters ❔
    * `width` : _number_
    * `lineHeigth`: _number_
    * `hideTitle` : _true | false_
    * `hideBorders`: _true | false_
    * `hide` : _string_
    * `isCompact`: _true | false_
    * `theme` : _dark | light | error_
    * `iconColor` : _string_
    * `titleColor` : _string_
    * `textColor` : _string_
    * `backgroundColor` : _string_

</details>

#### Repositories 📍

* 🔗 `/api/user/{username}/repository/{repositoryName}`

![imagen](https://user-images.githubusercontent.com/39351850/137608451-775c09ec-e9eb-47c9-9714-0085c166d839.png)

<details>

* Path Paramenters 🆔
    * `username`: _string_
    * `repositoryName`: _string_
* Query Parameters ❔
    * `width` : _number_
    * `lineHeigth`: _number_
    * `hideTitle` : _true | false_
    * `hideBorders`: _true | false_
    * `showOwner`: _true | false_
    * `theme` : _dark | light | error_
    * `iconColor` : _string_
    * `titleColor` : _string_
    * `textColor` : _string_
    * `backgroundColor` : _string_

</details>

### Organization :busts_in_silhouette:
#### Stats 📈

* 🔗 `/api/organization/{username}`

![imagen](https://user-images.githubusercontent.com/39351850/137608185-882b5406-5fc3-4f67-9202-4bc4a87043b3.png)

<details>

* Path Paramenters 🆔
    * `username`: _string_
* Query Parameters ❔
    * `width` : _number_ 
    * `lineHeigth`: _number_ 
    * `hideTitle` : _true | false_
    * `hideBorders`: _true | false_
    * `hideYear`: _true | false_
    * `hide` : _stars | members | teams | projects | packages | repositories_ 
    * `showIcons`: _true | false_
    * `includeAlCommits`: _true | false_
    * `theme` : _dark | light | error_
    * `iconColor` : _string_
    * `titleColor` : _string_
    * `textColor` : _string_
    * `backgroundColor` : _string_

</details>

#### Repositories 📍

* 🔗 `/api/organization/{username}/repository/{repositoryName}`

![imagen](https://user-images.githubusercontent.com/39351850/137646524-e8266dec-8b52-448f-891e-71cfc1e79d75.png)

<details>

* Path Paramenters 🆔
    * `username`: _string_
    * `repositoryName`: _string_
* Query Parameters ❔
    * `width` : _number_
    * `lineHeigth`: _number_
    * `hideTitle` : _true | false_
    * `hideBorders`: _true | false_
    * `showOwner`: _true | false_
    * `theme` : _dark | light | error_
    * `iconColor` : _string_
    * `titleColor` : _string_
    * `textColor` : _string_
    * `backgroundColor` : _string_

</details>

## Wiki :book:

In the Wiki of this project, there is more Details about APIs and its uses, it is in Spanish.

➕ [INFO :es:](https://github.com/gastonpereyra/cards-service/wiki)

## Found any Bug :bug: ?

[Report Here](https://github.com/gastonpereyra/cards-service/issues/new?assignees=gastonpereyra&labels=bug&template=bug.md&title=[BUG])

## Have an Idea :bulb: ?

[Tell me](https://github.com/gastonpereyra/cards-service/issues/new?assignees=gastonpereyra&labels=enhancement&title=%5BIDEA%5D+-)

## Credits

This project is inspire in one of [anuraghazra](https://github.com/anuraghazra):

[![github-readme-stats](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&theme=buefy)](https://github.com/anuraghazra/github-readme-stats#wakatime-week-stats)

Please support original project!

* ➖ [Differences](https://github.com/gastonpereyra/cards-service/wiki#-diferencias)