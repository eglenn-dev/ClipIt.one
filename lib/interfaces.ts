export interface RedirectLink {
    url: string;
    slug: string;
    userId: string;
    createdAt: number;
    clicks?: number;
    loadingScreen?: boolean;
}
