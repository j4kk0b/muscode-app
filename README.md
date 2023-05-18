# Muscode App

Muscode App jest aplikacją do zarządzania kafelkami produktów oraz listą zadań do wykonania (ToDo). Aplikacja została napisana w języku JavaScript i wykorzystuje programowanie obiektowe.

## Struktura projektu

Projekt składa się z dwóch głównych plików:

- `productManager.js`: Plik odpowiedzialny za zarządzanie kafelkami produktów. Zawiera funkcje umożliwiające edycję i manipulację kafelkami produktów. Kod w tym pliku jest napisany w stylu programowania obiektowego, co ułatwia rozszerzanie funkcjonalności związanych z zarządzaniem produktami.

- `todoManager.js`: Plik odpowiedzialny za listę zadań do wykonania (ToDo). Wykorzystuje mechanizm localStorage do przechowywania danych ToDo lokalnie w przeglądarce użytkownika. Kod w tym pliku również został napisany w stylu programowania obiektowego, umożliwiając prostą manipulację i aktualizację listy zadań.

## Wykorzystanie localStorage

Lista ToDo w Muscode App wykorzystuje mechanizm localStorage do przechowywania danych. Dzięki temu, zadania są zachowywane nawet po odświeżeniu strony lub zamknięciu przeglądarki. Aby wyczyścić całą listę ToDo za jednym ruchem, można użyć polecenia `localStorage.clear()` w konsoli przeglądarki. Spowoduje to usunięcie wszystkich danych przechowywanych w localStorage, w tym również listy ToDo.

## Uruchomienie aplikacji

Aby uruchomić aplikację Muscode App, wykonaj poniższe kroki:

1. Sklonuj repozytorium na swój lokalny komputer.

2. Otwórz plik `index.html` w dowolnej nowoczesnej przeglądarce internetowej.

3. Aplikacja zostanie załadowana, a ty będziesz mógł/mogła zarządzać kafelkami produktów i listą ToDo.



