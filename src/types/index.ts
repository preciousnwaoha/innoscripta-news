export interface TopicItemType {
    id: number
    name: string
    description: string
    image: string
    datetime: string
    source: {
        name: string
        url: string
        image: string
        author: {
            name: string
            url: string
            image: string
        }
    }
}