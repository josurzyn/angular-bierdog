export interface Bier {
  id: number;
  name: string;
  tagline?: string;
  description?: string;
  image_url: string | null;
  abv: number;
  food_pairing?: string[];
  favourite?: boolean;
}
