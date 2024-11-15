## Styles

A mix of [bootstrap](https://getbootstrap.com/docs/4.6/utilities/spacing/) classes and [SCSS](https://sass-lang.com/documentation) is used for the styles on the site.

As a good practice, each `component` or `page` should have a unique class that encapsulates all the styles of the component / page.
This should be done to prevent styles from accidentaly overriding other elements with the same class.
**As such, the BEM methodology should be followed for writting CSS / SCSS.** 

<br>

-------------------------------------------------------------------

#### [BEM methodology](http://getbem.com/)

[BEM methodology](http://getbem.com/) - Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development.

BEM is the css methodology that we intend to use for this project. 
As such, it is highly recommended that you quickly get familiar with it, if you haven't worked with it previously. 

It doesn't take much time to get a grasp of it and it works really well with SCSS.


Example: 
```scss
.component-class {
  font-size: 1.6rem;

  &__title {
    font-size: 2rem;

    &:hover {
      color: blue;
    }
  }
}
```

will generate 

```css
.component-class { font-size: 1.6rem; }

.component-class__title { font-size: 2rem; }

.component-class__title:hover { color: blue; }
```

Resources that might help:

* SCSS parent selector `&` : https://sass-lang.com/documentation/style-rules/parent-selector

<br>

-------------------------------------------------------------------
#### File architecture

Files concerning styles are located in `/styles/` and in `/components/`.

* As a good practice, style files in the `/components/` directory should be next to the component that they are styling.
<br>

* `styles/pages/` - Page specifc styles, that are not related to a component, and that are **not** global.
<br>

* `styles/abstract/` -  SCSS mixins, variables, and functions, that are reusable.
<br>

* `styles/bootstrap-theme/` - Overriding bootstrap scss variables.
<br>

* `styles/global/` - Global styles that are not related to components or pages. (E.g.: Typography, CSS resets and global bootstrap overrides)
<b> If you're currently working on a new feature, and think that this style should be global, I would strongly suggest that you consider if what you're working on shouldn't instead be a reusable component and the style be related to that specific component. (not global)  </b>
<br>


<br>

-------------------------------------------------------------------
#### Importing Styles

SCSS files can be imported directly into a TS / JS file.

<br>

Example:

Let's say that we have the following file structure: 

```
components/
    myComponent/
        myComponent.tsx
        styles.scss

pages/
    myPage.tsx

styles/
    pages/
        MyPage.scss
```

We can import the style files, as follows:

```javascript
// in myComponent.tsx
import './styles.scss';
```

```javascript
// in myPage.tsx
import 'styles/pages/myPage.scss';
```



