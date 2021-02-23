declare module 'vue-tweet-embed' {
  export const Tweet: {
    data(): {
      isLoaded: boolean
      isAvailable: boolean
    }
    props: any
    mounted(): void
    render(h: any): any
  }
}
