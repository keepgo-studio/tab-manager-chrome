import { css } from "lit";

const resetCss = css`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
  
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
`;

const globalCss = css`
  :root{
    --dark-mode-background: #333333;
    --light-mode-background: #F9F9F9;
  }

  main search-component{
    position: absolute;
    bottom: 0;
    right:0;
  }

  @media(prefers-color-scheme: dark) {
    body {
        color: #fff;
        background-color: var(--dark-mode-background);
    }
  }

  @media (perfers-color-scheme: light) {
    body {
        color: #000;
        background-color: var(--light-mode-background);
    }
    
  }
`;

export const globalStyles = css`
  ${resetCss}

  ${globalCss}
`;