import { createGlobalStyle, DefaultTheme } from "styled-components";

export const BeaconTheme: DefaultTheme = {
  mq: {
    xs: "(min-width: 0px)",
    s: "(min-width: 480px)",
    "s-down": "(max-width: 767px)",
    m: "(min-width: 768px)",
    "m-down": "(max-width: 991px)",
    l: "(min-width: 992px)",
    xl: "(min-width: 1200px)",
    xxl: "(min-width: 1600px)",
  },
};

export const BeaconThemeGlobalStyle = createGlobalStyle`

  /* App Styles */
  :root {
    --bc__context-background: var(--bc__context-background--background, none);
    color: var(--bc__text-color--on-background, none);
  }
  
  body {
    font-size: 18px;
  }

  [data-bc-context],
  :root {
    background: var(--bc__context-background);
  }

  [data-bc-context="none"] {
    background: none;
  }

  /* Computed styles */
  [data-bc-context="background"],
  :root {
    /* GLOBAL */
    --bc__context-background: var(--bc__context-background--background, none);
    --bc__text-color: var(--bc__text-color--on-background, inherit);

    /* HEADING */
    --bc__heading-color: var(--bc__heading-color--on-background, inherit);

    /* SUBHEADING */
    --bc__subheading-color: var(--bc__subheading-color--on-background, inherit);

    /* LINK */
    --bc__link-color: var(--bc__link-color--on-background, inherit);
    --bc__link-color--hover: var(
            --bc__link-color--hover-on-background,
            inherit
    );

    /* INPUT */
    --bc__input-color: var(--bc__input-color--on-background, inherit);
    --bc__input-background: var(--bc__input-background--on-background, inherit);
    --bc__input-border: var(--bc__input-border--on-background, inherit);

    /* LABEL */
    --bc__label-color: var(--bc__label-color--on-background, inherit);

    /* NAV ITEM */
    --bc__nav-item-color: var(--bc__nav-item-color--on-background, inherit);
    --bc__nav-item-color--hover: var(
            --bc__nav-item-color--hover-on-background,
            inherit
    );

    /* SMALL */
    --bc__small-color: var(--bc__small-color--on-background, inherit);

    /* PARAGRAPH */
    --bc__paragraph-color: var(--bc__paragraph-color--on-background, inherit);

    /* BUTTON */
    --bc__button-text-color: var(
            --bc__button-text-color--on-background,
            inherit
    );
    --bc__button-background: var(
            --bc__button-background--on-background,
            inherit
    );
    --bc__button-box-shadow: var(
            --bc__button-box-shadow--on-background,
            inherit
    );
    --bc__button-border: var(--bc__button-border--on-background, inherit);
    --bc__button-text-color--hover: var(
            --bc__button-text-color--hover-on-background,
            inherit
    );
    --bc__button-background--hover: var(
            --bc__button-background--hover-on-background,
            inherit
    );
    --bc__button-background--disabled: var(
            --bc__button-background--disabled-on-background,
            inherit
    );
    --bc__button-text-color--disabled: var(
            --bc__button-text-color--disabled-on-background,
            inherit
    );
    --bc__button-box-shadow--hover: var(
            --bc__button-box-shadow--hover-on-background,
            inherit
    );
    --bc__button-border--hover: var(
            --bc__button-border--hover-on-background,
            inherit
    );
  }

  [data-bc-context="surface"] {
    /* GLOBAL */
    --bc__context-background: var(--bc__context-background--surface, none);
    --bc__text-color: var(--bc__text-color--on-surface, inherit);

    /* Heading */
    --bc__heading-color: var(--bc__heading-color--on-surface, inherit);

    /* Subheading */
    --bc__subheading-color: var(--bc__subheading-color--on-surface, inherit);

    /* Link */
    --bc__link-color: var(--bc__link-color--on-surface, inherit);
    --bc__link-color--hover: var(--bc__link-color--hover-on-surface, inherit);

    /* INPUT */
    --bc__input-color: var(--bc__input-color--on-surface, inherit);
    --bc__input-background: var(--bc__input-background--on-surface, inherit);
    --bc__input-border: var(--bc__input-border--on-surface, inherit);

    /* LABEL */
    --bc__label-color: var(--bc__label-color--on-surface, inherit);

    /* NAV ITEM */
    --bc__nav-item-color: var(--bc__nav-item-color--on-surface, inherit);
    --bc__nav-item-color--hover: var(
            --bc__nav-item-color--hover-on-surface,
            inherit
    );

    /* SMALL */
    --bc__small-color: var(--bc__small-color--on-surface, inherit);

    /* PARAGRAPH */
    --bc__paragraph-color: var(--bc__paragraph-color--on-surface, inherit);

    /* Button */
    --bc__button-text-color: var(--bc__button-text-color--on-surface, inherit);
    --bc__button-background: var(--bc__button-background--on-surface, inherit);
    --bc__button-box-shadow: var(--bc__button-box-shadow--on-surface, inherit);
    --bc__button-border: var(--bc__button-border--on-surface, inherit);
    --bc__button-text-color--hover: var(
            --bc__button-text-color--hover-on-surface,
            inherit
    );
    --bc__button-background--hover: var(
            --bc__button-background--hover-on-surface,
            inherit
    );
    --bc__button-background--disabled: var(
            --bc__button-background--disabled-on-surface,
            inherit
    );
    --bc__button-text-color--disabled: var(
            --bc__button-text-color--disabled-on-surface,
            inherit
    );
    --bc__button-box-shadow--hover: var(
            --bc__button-box-shadow--hover-on-surface,
            inherit
    );
    --bc__button-border--hover: var(
            --bc__button-border--hover-on-surface,
            inherit
    );
  }

  [data-bc-context="error"] {
    background: var(--bc__context-background--error, none);

    /* Link */
    --bc__link-color: var(--bc__link-color--on-error, inherit);
    --bc__link-color--hover: var(--bc__link-color--hover-on-error, inherit);

    /* Button */
    --bc__button-text-color: var(--bc__button-text-color--on-error, inherit);
    --bc__button-background: var(--bc__button-background--on-error, inherit);
    --bc__button-box-shadow: var(--bc__button-box-shadow--on-error, inherit);
    --bc__button-border: var(--bc__button-border--on-error, inherit);
    --bc__button-text-color--hover: var(
            --bc__button-text-color--hover-on-error,
            inherit
    );
    --bc__button-background--hover: var(
            --bc__button-background--hover-on-error,
            inherit
    );
    --bc__button-box-shadow--hover: var(
            --bc__button-box-shadow--hover-on-error,
            inherit
    );
    --bc__button-border--hover: var(
            --bc__button-border--hover-on-error,
            inherit
    );
  }

  /* Configuration Styles */
  :root {
    /************* GLOBAL *************/

    /* Common */
    --bc__font-family: "Roboto Condensed", sans-serif;
    --bc__section-side-padding: var(--bc__spacing--m);
    --bc__section-max-width--narrow: 596px;
    --bc__section-max-width--wide: 1280px;
    --bc__section-max-width: var(--bc__section-max-width--wide);
    --bc__spacing--xs: 0.25rem;
    --bc__spacing--s: 0.5rem;
    --bc__spacing--m: 1rem;
    --bc__spacing--l: 1.5rem;
    --bc__spacing--xl: 2rem;
    --bc__spacing--xxl: 3.5rem;

    /* On Background */
    --bc__context-background--background: #ddd;
    --bc__text-color--on-background: black;

    /* On Surface */
    --bc__context-background--surface: #ddd;
    --bc__text-color--on-surface: black;

    /* On Surface */
    --bc__context-background--error: red;
    --bc__text-color--on-error: white;

    /************* HEADING *************/

    /* Common */
    --bc__heading-font-family: "Roboto Condensed", sans-serif;
    --bc__heading-text-align: center;
    --bc__heading-line-height: 2rem;

    /* On Background */
    --bc__heading-color--on-background: black;

    /* On Surface */
    --bc__heading-color--on-surface: black;

    /* On Error */
    --bc__heading-color--on-error: white;

    /************* SUBHEADING *************/

    /* Common */
    --bc__subheading-font-family: "Roboto Condensed", sans-serif;
    --bc__subheading-text-align: center;
    --bc__subheading-line-height: 2rem;

    /* On Background*/
    --bc__subheading-color--on-background: black;

    /* On Surface */
    --bc__subheading-color--on-surface: black;

    /* On Error */
    --bc__subheading-color--on-error: white;

    /************* PARAGRAPH *************/

    /* Common */
    --bc__paragraph-font-family: "Roboto Condensed", sans-serif;
    --bc__paragraph-text-align: center;
    --bc__paragraph-line-height: 1.5rem;

    /* On Background*/
    --bc__paragraph-color--on-background: #ddd;

    /* On Surface */
    --bc__paragraph-color--on-surface: black;

    /* On Error */
    --bc__paragraph-color--on-error: white;

    /************* SMALL *************/

    /* Common */
    --bc__small-font-family: "Roboto Condensed", sans-serif;
    --bc__small-text-align: center;
    --bc__small-line-height: 1rem;

    /* On Background*/
    --bc__small-color--on-background: #ddd;

    /* On Surface */
    --bc__small-color--on-surface: black;

    /* On Error */
    --bc__small-color--on-error: white;

    /************* LABEL *************/

    /* Common */
    --bc__label-font-family: "Roboto Condensed", sans-serif;
    --bc__label-text-align: center;
    --bc__label-line-height: 1rem;

    /* On Background*/
    --bc__label-color--on-background: #ddd;

    /* On Surface */
    --bc__label-color--on-surface: black;

    /* On Error */
    --bc__label-color--on-error: white;

    /************* INPUT *************/

    /* Common */
    --bc__input-font-family: "Roboto Condensed", sans-serif;
    --bc__input-text-align: center;
    --bc__input-line-height: 1rem;
    --bc__input-padding: var(--bc__spacing--s) var(--bc__spacing--m);
    --bc__input-border-radius: 0;

    /* On Background*/
    --bc__input-color--on-background: #dedede;
    --bc__input-background--on-background: gray;
    --bc__input-border--on-background: 1px solid #ddd;

    /* On Surface */
    --bc__input-color--on-surface: black;
    --bc__input-background--on-surface: #ddd;
    --bc__input-border--on-surface: 1px solid black;

    /* On Error */
    --bc__input-color--on-error: white;
    --bc__input-background--on-error: red;
    --bc__input-border--on-error: 1px solid gray;

    /************* NAV ITEM *************/

    /* Common */
    --bc__nav-item-font-family: "Roboto Condensed", sans-serif;
    --bc__nav-item-line-height: 1rem;

    /* On Background */
    --bc__nav-item-color--on-background: red;
    --bc__nav-item-color--hover-on-background: gold;

    /* On Surface */
    --bc__nav-item-color--on-surface: red;
    --bc__nav-item-color--hover-on-surface: gold;

    /* On Error */
    --bc__nav-item-color--on-error: white;
    --bc__nav-item-color--hover-on-error: white;

    /************* LINK *************/

    /* Common */
    --bc__link-font-family: "Roboto Condensed", sans-serif;

    /* On Background */
    --bc__link-color--on-background: red;
    --bc__link-color--hover-on-background: gold;

    /* On Surface */
    --bc__link-color--on-surface: red;
    --bc__link-color--hover-on-surface: gold;

    /* On Error */
    --bc__link-color--on-error: white;
    --bc__link-color--hover-on-error: white;

    /************* BUTTON *************/

    /* Common */
    --bc__button-line-height: 1.5rem;
    --bc__button-transition: 0.25s color, 0.25s background;
    --bc__button-border-radius: 0;
    --bc__button-font-family: "Roboto Condensed", sans-serif;

    /* On Background */
    --bc__button-text-color--on-background: white;
    --bc__button-background--on-background: black;
    --bc__button-box-shadow--on-background: none;
    --bc__button-border--on-background: none;
    --bc__button-text-color--hover-on-background: black;
    --bc__button-background--hover-on-background: white;
    --bc__button-box-shadow--hover-on-background: none;
    --bc__button-border--hover-on-background: none;
    --bc__button-background--disabled-on-background: #999999;
    --bc__button-text-color--disabled-on-background: #555555;

    /* On Surface */
    --bc__button-text-color--on-surface: #dedede;
    --bc__button-background--on-surface: black;
    --bc__button-box-shadow--on-surface: none;
    --bc__button-border--on-surface: none;
    --bc__button-text-color--hover-on-surface: black;
    --bc__button-background--hover-on-surface: white;
    --bc__button-box-shadow--hover-on-surface: none;
    --bc__button-border--hover-on-surface: none;
    --bc__button-background--disabled-on-surface: #999999;
    --bc__button-text-color--disabled-on-surface: #555555;
  }

  @media ${({ theme }) => theme.mq.m} {
    body {
      font-size: 137.5%;
    }
  }

  * {
    box-sizing: border-box;
  }
`;
