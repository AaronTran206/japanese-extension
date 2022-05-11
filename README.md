# Japanese Dictionary Extension <br>

## Summary <br>

This is a Google extension app that assists in finding Japanese words that match the word that the user inputs. <br>

## Output Screens <br>

There is a landing screen that displays Oshushi saying "よろしく", which can be roughly translated to "excited to work with you!". After a word is input, there are three types of components that appear:

- The first one is the Loading screen. Which is the rotating circle icon. This appears while the app is going through the backend database and searching for any words that match the input
- The second one is the Error screen. It displays an Oshushi saying "I'm sorry. I couldn't find the word you were searching for...". This appears when the input doesnt match any words in the backend database.
- The last one is the Dictionary Card screen that displays all the words that matched the input. The cards display the kanji, furigana, and hiragana. The definitions are displayed in numbered format. The definitions also display the part-of-speech of the usage being described.

## Inputs <br>

There are five different types of inputs that the app will accept:

- The user can input an English word.
- The user can input Romaji.
- The user can input Hiragana.
- The user can input Kanji.
- The user can input a Japanese sentence. This sentence will be parsed into separate tokens that are clickable. When clicked, the word will become the searched word and the app will search through the database and return entries relating to that word. On hover, the tokens will display the part-of-speech of said word.
