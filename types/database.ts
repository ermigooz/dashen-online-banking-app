export interface Share {
  id: string
  shareholder_id: string
  total_shares: number
  share_value: number
  purchase_date: string
}

export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string
  country: string
  city: string
  preferred_language: string
}

export interface Event {
  id: string
  title: string
  description: string
  event_type: string
  start_date: string
  end_date: string | null
  location: string | null
  virtual_link: string | null
  is_public: boolean
}
