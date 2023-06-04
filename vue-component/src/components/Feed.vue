<script>
import {defineCustomElement} from 'vue';

const FEED_API_URL = 'https://api.realworld.io/api/articles';

const Feed = defineCustomElement({
    styles: [`
    .article {
      border-top: 1px solid rgba(0,0,0,.1);
      padding: 1.5rem 0;
    }
    .article__avatar {
      display: flex;
      align-items: center;
    }

    .article__author {
      margin-left: 8px;
    }

    .article__author--name {
    color: #3d8b3d;
    text-decoration: underline;
    }

    .article__created {
      font-size: .8rem;
      display: block;
      color: #bbb;
    }

    .article__title {
      font-weight: 600!important;
      font-size: 1.5rem!important;
      margin-bottom: 3px;
    }

    .article__description {
      font-weight: 300;
      font-size: 24px;
      color: #999;
      margin-bottom: 15px;
      font-size: 1rem;
      line-height: 1.3rem;
    }

    .article__tag {
      border: 1px solid #ddd;
      color: #aaa!important;
      background: 0 0!important;
      border-radius: 10rem;
      padding: 5px;
      font-size: 14px;
    }

    .article__tag-list {
      padding-left: 0!important;
      display: flex;
      list-style: none!important;
      vertical-align: top;
      gap: 8px;
      justify-content: end;
      margin: 0;
    }
   `],
    template: `
      <div class="article-container">
      <div v-if="loading">
        Loading articles...
      </div>
      <div v-else class="article" v-for="article in articles" :article="article">
        <div class="article__avatar">
          <div>
            <img :src="article.author.image" alt="">
          </div>
          <div class="article__author">
            <div class="article__author--name ">
              {{ article.author.username }}
            </div>
            <div class="article__created">{{ article.createdAt }}</div>
          </div>

        </div>
        <div class="article__title">
          {{ article.title }}
        </div>
        <p class="article__description">
          {{ article.description }}
        </p>
        <ul class="article__tag-list">
          <li class="article__tag" v-for="tag in article.tagList" :key="tag">{{ tag }}</li>
        </ul>
      </div>

      </div>
    `,
    data: () => ({
        articles: [],
        articlesCount: 0,
        loading: false,
        limit: 10,
        page: 1
    }),
    async mounted() {
        await this.fetchFeed()
    },
    methods: {
        getUrl() {
            const offset = this.page * this.limit - this.limit
            return `${FEED_API_URL}?limit=${this.limit}&offset=${offset}`
        },
        async fetchFeed() {
            try {
                this.loading = true;
                const url = this.getUrl();
                const response = await fetch(url);
                const {articles, articlesCount} = await response.json();
                [this.articles, this.articlesCount] = [articles, articlesCount];
                console.log(this.articles)
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
    },
});

customElements.define("feed-component", Feed);

export default Feed;
</script>