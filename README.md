# jekyons
Stop writing CSS and start building prototypes.


# huh?
Jekyons is a starting point to build prototypes with Jekyll using functional CSS. A few friends asked to check out my prototyping stack so I cleaned it up a little bit and here we are. I've already fumbled around integrating cool stuff like [BrowserSync](https://www.browsersync.io/) (actual magic) and [18F's jekyll-get](https://github.com/18F/jekyll-get) plugin so you don't have to.


# why do I care?
GR8 question. Writing CSS is hard. Maintaining CSS across a team of developers and multiple projects is absolutely impossible. That makes prototyping, something that should feel natural in concept, a real bummer in practice. The power of Jekyll templating and the maintainability of Tachyons is the closest I've come to solving that problem. 

Take the list of features on the Jekyons website. Responsive columns, multiple repeating elements in each bucket, images; this could easily amount to over 50 lines of HTML and possibly even more CSS. With Jekyll & Tachyons, I was able to lay it out in about 20 minutes with less than 10 lines of code *total*. Check it out:

```
<div class="ma4 ma5-ns">
  {% for feature in site.data.features %}
  <div class="w-33-l pr4 mb5 fl-l mt4 cf-4th p-fix">
    <img class="w2" src="{{ feature.icon }}">
    <h2 class="normal">{{ feature.name }}</h2>
    <p class="lh-copy f5">{{ feature.description }}</p>
  </div>
  {% endfor %}
</div>
```

If you don't think that's cool you can LEAVE.


# ok, how?
```
git clone https://github.com/tinychime/jekyons.git your-project
cd your-project
bundle install
gulp
```

# thx
