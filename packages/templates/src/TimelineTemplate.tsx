/**
 * TimelineTemplate - For chronological content display
 * Used for: Historical timelines, Event history, Biography timelines
 */

import React from 'react';

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
  };
  url?: string;
  type?: string;
}

export interface TimelineTemplateProps {
  heading: string;
  subheading?: string;
  body?: React.ReactNode;
  events: TimelineEvent[];
  layout?: 'vertical' | 'horizontal' | 'alternating';
  showYearMarkers?: boolean;
  className?: string;
}

export function TimelineTemplate({
  heading,
  subheading,
  body,
  events,
  layout = 'vertical',
  showYearMarkers = true,
  className = '',
}: TimelineTemplateProps) {
  // Group events by year if showing year markers
  const groupedEvents = showYearMarkers
    ? events.reduce((acc, event) => {
        const year = new Date(event.date).getFullYear().toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(event);
        return acc;
      }, {} as Record<string, TimelineEvent[]>)
    : null;

  return (
    <div className={`timeline-template timeline-template--${layout} ${className}`}>
      {/* Header */}
      <header className="timeline-header">
        <h1 className="timeline-heading">{heading}</h1>
        {subheading && <p className="timeline-subheading">{subheading}</p>}
        {body && <div className="timeline-intro">{body}</div>}
      </header>

      {/* Timeline */}
      <div className="timeline-container">
        {groupedEvents ? (
          // Grouped by year
          Object.entries(groupedEvents)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([year, yearEvents]) => (
              <div key={year} className="timeline-year-group">
                <div className="timeline-year-marker">
                  <span className="year-label">{year}</span>
                </div>
                <div className="timeline-events">
                  {yearEvents.map((event, index) => (
                    <TimelineEventCard key={event.id} event={event} index={index} />
                  ))}
                </div>
              </div>
            ))
        ) : (
          // Flat list
          <div className="timeline-events">
            {events.map((event, index) => (
              <TimelineEventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Individual timeline event card
 */
function TimelineEventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const content = (
    <>
      {event.image && (
        <figure className="event-image">
          <img src={event.image.url} alt={event.image.alt || event.title} />
        </figure>
      )}
      <div className="event-content">
        <time className="event-date">{formatTimelineDate(event.date)}</time>
        <h3 className="event-title">{event.title}</h3>
        {event.description && <p className="event-description">{event.description}</p>}
        {event.type && <span className="event-type">{event.type}</span>}
      </div>
    </>
  );

  return (
    <article className={`timeline-event timeline-event--${index % 2 === 0 ? 'left' : 'right'}`}>
      <div className="event-marker" />
      {event.url ? (
        <a href={event.url} className="event-card event-card--linked">
          {content}
        </a>
      ) : (
        <div className="event-card">{content}</div>
      )}
    </article>
  );
}

/**
 * Format date for timeline display
 */
function formatTimelineDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default TimelineTemplate;
