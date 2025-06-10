# Rick and Morty Character Collection

A comprehensive Angular application for managing a collection of Rick and Morty characters using RxJS, Signals, Angular 19+, and the Rick and Morty API.  
This project is built within an NX workspace as a single Angular application.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Architecture](#architecture)  
- [Technologies Used](#technologies-used)  
- [Components](#components)  
- [Services](#services)  
- [RxJS Usage](#rxjs-usage)  
- [Change Detection](#change-detection)  
- [Styling & UI/UX](#styling--uiux)  
- [Testing](#testing)  
- [Limitations & Future Work](#limitations--future-work)  
- [Getting Started](#getting-started)  
- [Deployment](#deployment)  

---

## Project Overview

This Angular application enables users to browse, create, update, and delete Rick and Morty characters. It fetches character data and images from the [Rick and Morty API](https://rickandmortyapi.com/), supports infinite scrolling for seamless browsing, and allows users to save favorite characters locally.

---

## Features

- **Character Browsing:** View characters fetched from the Rick and Morty API.  
- **Search:** Filter characters by name, species, or type using a search bar with API-backed filtering.  
- **Infinite Scrolling:** Load more characters automatically as the user scrolls.  
- **CRUD Operations:**  
  - Create new characters (stored locally).  
  - Update or delete only locally created characters.  
- **Favorites:** Add characters to favorites, saved persistently using localStorage.  
- **Character Details:** View detailed info in a dialog popup.  
- **Reactive Forms:** Character creation and editing utilize Angular reactive forms with validation.  
- **Animations & Hover Effects:** Smooth transitions and interactive UI elements for an enhanced user experience.  
- **Angular CDK Dialog:** Used for modals to display character details and add/edit forms.  
- **Responsive Design:** Fully responsive using SCSS with Flexbox/Grid and media queries.

---

## Architecture

The project is structured in an NX workspace (single-project mode), with separation of concerns using Angular modules, components, and services.

- **Pages Module:** Contains main page components (main component).  
- **Shared Components:** Search bar, characters list, character card, favorites list, and add/edit forms.  
- **Services:** Abstract API calls, localStorage handling, and business logic.

---

## Technologies Used

- Angular 19+  (Signals)
- Nx Workspace (single project)  
- RxJS (switchMap, mergeMap, debounceTime, distinctUntilChanged, etc.)  
- Angular CDK (Dialog module)  
- ngx-infinite-scroll  
- Jest (for unit testing)  
- SCSS with Flexbox/Grid, media queries, and CSS animations  
- Rick and Morty API ([https://rickandmortyapi.com/](https://rickandmortyapi.com/))  

---

## Components

| Component              | Description                                                                                      |
|------------------------|--------------------------------------------------------------------------------------------------|
| **MainComponent**      | Root page component housing the search bar, characters list, and favorites display.             |
| **SearchBarComponent**  | Input for filtering characters by name, species, and type, connected to API filtering.           |
| **CharactersListComponent** | Displays a paginated, infinite scroll list of characters, each rendered with CharacterCardComponent. |
| **CharacterCardComponent** | Shows character image, name, and action buttons (Add to favorites, Edit, Delete). Edit/Delete only for locally saved characters. |
| **CharacterDetailsComponent** | Dialog component showing detailed character info when clicking on a character image.          |
| **AddEditCharacterComponent** | Dialog component containing reactive forms for adding or editing characters stored locally.      |
| **FavoritesComponent** | Displays the list of user's favorite characters using FavoriteCharacterComponent.                 |

---

## Services

| Service                | Purpose                                                                                         |
|------------------------|------------------------------------------------------------------------------------------------|
| **LocalStorageService** | General localStorage handling (CRUD for saved data).                                           |
| **CharactersService**   | Extends LocalStorageService; manages CRUD for locally created characters.                      |
| **FavoritesService**    | Extends LocalStorageService; manages favorite characters list.                                 |
| **DataService**         | Handles all HTTP requests to Rick and Morty API and exposes data streams as observables.       |

---

## RxJS Usage

- **API Calls:** `DataService` uses RxJS `HttpClient` with operators like `switchMap`, `forkJoin`, `map`, `tap`, `getTakeUntilDestroyed` and `catchError` to manage API requests efficiently.  
- **Search Bar:** Uses `debounceTime` and `distinctUntilChanged` to optimize API calls while typing search queries.  
- **Infinite Scroll:** Combines observables for scroll events and API calls with operators to append additional character pages seamlessly.  
- **Form Controls:** Reactive form value changes subscribed to observables for validation and dynamic behavior.

---

## Change Detection

- The application uses Angular's default change detection strategy (`Default`) with optimized observable subscriptions and `OnPush` on specific components to improve performance.  
- Components relying on input properties and observables use `ChangeDetectionStrategy.OnPush` to minimize unnecessary re-renders.  
- Change detection strategy and reasoning are documented in the relevant component files.

---

## Styling & UI/UX

- **SCSS:** Modular styling with variables and mixins for consistency.  
- **Layout:** Utilizes Flexbox and CSS Grid for responsive, clean layout.  
- **Responsive Design:** Media queries ensure usability across mobile, tablet, and desktop screens.  
- **Animations:** Smooth fade-in and hover effects on character cards and buttons for better user engagement.  
- **Icon Sets:** Custom icons and graphics used to create a unique visual identity.  
- **Interactive Elements:** Buttons and lists have hover states and transitions to enhance interactivity.

---

## Testing

- Jest is used for unit testing with 86% code coverage.  
- Tests cover components, services, and RxJS logic to ensure robustness.  
- Sample tests include form validation, service CRUD operations, and observable streams.

---

## Limitations & Future Work

- **NX Monorepo Usage:** Though built in an NX workspace, this project is currently a single app, not a full monorepo.  
- **Deployment link: https://rick-and-morty-collection-qwfo.vercel.app/.
---

## Getting Started

### Prerequisites

- Node.js v18+  
- Angular CLI v19+  
- Nx CLI  

