"use client"

import { BadgeGenerator } from '@/components/BadgeGenerator'
import { sessions } from '@/lib/sessions'

export default function HomePage() {
  return <BadgeGenerator session={sessions[0]} />
} 