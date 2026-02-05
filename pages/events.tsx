import Head from 'next/head'
import { useState, FormEvent } from 'react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  locationDetails: string
  description: string
  coverImage: string
  attendees: number
  host: string
  lumaUrl: string
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'AI Coding Community Meetup - Vibe & Connect',
    date: 'Saturday, 14 February 2026',
    time: '12:00 PM - 2:00 PM',
    location: 'Whatever Works Coffee',
    locationDetails: 'Kuala Lumpur, Malaysia',
    description: 'Join the AI Coding Malaysia Community crew for a chill community meetup. No hard selling, no long talks — just good vibes, real conversations, and people who are into AI, coding, and building stuff.',
    coverImage: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=800,height=400/gallery-images/fx/676d2304-1be9-4066-8d9c-d5185af971db',
    attendees: 26,
    host: 'Wan Muhammad Nabil Bin Wan Ismail',
    lumaUrl: 'https://lu.ma/shb4y4n8?tk=wBSZyl'
  }
]

export default function EventsPage() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    location: '',
    description: '',
    organizerName: '',
    organizerContact: ''
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Format the message for WhatsApp
    const message = `Hi Nabil! I'd like to feature an event:

*Event Name:* ${formData.eventName}
*Date:* ${formData.eventDate}
*Time:* ${formData.eventTime}
*Location:* ${formData.location}
*Description:* ${formData.description}

*Organizer Details:*
Name: ${formData.organizerName}
Contact: ${formData.organizerContact}

Looking forward to hearing from you!`

    // WhatsApp link with pre-filled message
    const whatsappNumber = '60182934765' // +60 18-293 4765
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>Upcoming Events | VibeCodeee</title>
        <meta
          name="description"
          content="Join our upcoming community events, meetups, and workshops. Connect with fellow developers and creators."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
              Upcoming Events
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600">
              Join our community events, meetups, and workshops. Connect with fellow developers,
              learn new skills, and build meaningful relationships.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="group overflow-hidden transition-all hover:shadow-xl"
              >
                {/* Event Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Event Details */}
                <div className="flex flex-col">
                  <div className="pt-5">
                    <h3 className="mb-5 text-xl font-bold text-zinc-900 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Date & Time */}
                    <div className="mb-4 flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="text-sm text-zinc-600">
                        <div className="font-medium text-zinc-900">{event.date}</div>
                        <div>{event.time}</div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-5 flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="text-sm text-zinc-600">
                        <div className="font-medium text-zinc-900">{event.location}</div>
                        <div>{event.locationDetails}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-5 text-sm text-zinc-600 line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <a
                      href={event.lumaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                      View Event Details
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State for Future Events */}
          {upcomingEvents.length === 0 && (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-16 w-16 text-zinc-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                No Upcoming Events
              </h3>
              <p className="text-zinc-600">
                Check back soon for new community events and meetups!
              </p>
            </div>
          )}

          {/* Feature Event Section */}
          <div className="mt-24 border-t border-zinc-200 pt-16">
            <div className="mx-auto max-w-3xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-zinc-900 mb-3">
                  Have an Event to Feature?
                </h2>
                <p className="text-lg text-zinc-600">
                  Share your event details and we'll get back to you on WhatsApp
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Event Name */}
                  <div>
                    <label htmlFor="eventName" className="block text-sm font-medium text-zinc-900 mb-2">
                      Event Name *
                    </label>
                    <input
                      type="text"
                      id="eventName"
                      name="eventName"
                      required
                      value={formData.eventName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                      placeholder="AI Coding Community Meetup"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="eventDate" className="block text-sm font-medium text-zinc-900 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="eventTime" className="block text-sm font-medium text-zinc-900 mb-2">
                        Time *
                      </label>
                      <input
                        type="time"
                        id="eventTime"
                        name="eventTime"
                        required
                        value={formData.eventTime}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-zinc-900 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                      placeholder="Whatever Works Coffee, Kuala Lumpur"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-zinc-900 mb-2">
                      Event Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all resize-none"
                      placeholder="Tell us about your event..."
                    />
                  </div>

                  {/* Organizer Details */}
                  <div className="pt-4 border-t border-zinc-200">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                      Your Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="organizerName" className="block text-sm font-medium text-zinc-900 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="organizerName"
                          name="organizerName"
                          required
                          value={formData.organizerName}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="organizerContact" className="block text-sm font-medium text-zinc-900 mb-2">
                          Contact (Email or Phone) *
                        </label>
                        <input
                          type="text"
                          id="organizerContact"
                          name="organizerContact"
                          required
                          value={formData.organizerContact}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                          placeholder="your@email.com or +60 12-345 6789"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                    >
                      Contact Admin
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
