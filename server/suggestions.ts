// Smart Suggestions Engine for Social Media Optimization

export interface Suggestion {
  type: 'timing' | 'hashtag' | 'content' | 'platform' | 'engagement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon?: string;
}

// Platform-specific best posting times (based on industry research)
const PLATFORM_BEST_TIMES: Record<string, { day: string; times: string[] }[]> = {
  facebook: [
    { day: 'Tuesday', times: ['9:00 AM', '1:00 PM'] },
    { day: 'Wednesday', times: ['9:00 AM', '1:00 PM'] },
    { day: 'Thursday', times: ['9:00 AM', '1:00 PM'] },
  ],
  instagram: [
    { day: 'Monday', times: ['11:00 AM', '7:00 PM'] },
    { day: 'Tuesday', times: ['11:00 AM', '2:00 PM'] },
    { day: 'Wednesday', times: ['11:00 AM', '7:00 PM'] },
  ],
  twitter: [
    { day: 'Wednesday', times: ['9:00 AM', '12:00 PM', '3:00 PM'] },
    { day: 'Friday', times: ['9:00 AM', '12:00 PM'] },
  ],
  linkedin: [
    { day: 'Tuesday', times: ['10:00 AM', '12:00 PM'] },
    { day: 'Wednesday', times: ['10:00 AM', '12:00 PM'] },
    { day: 'Thursday', times: ['10:00 AM', '12:00 PM'] },
  ],
  tiktok: [
    { day: 'Tuesday', times: ['6:00 AM', '10:00 AM', '10:00 PM'] },
    { day: 'Thursday', times: ['6:00 AM', '10:00 AM', '10:00 PM'] },
    { day: 'Friday', times: ['5:00 AM', '1:00 PM', '3:00 PM'] },
  ],
  youtube: [
    { day: 'Thursday', times: ['2:00 PM', '4:00 PM'] },
    { day: 'Friday', times: ['2:00 PM', '4:00 PM'] },
    { day: 'Saturday', times: ['9:00 AM', '11:00 AM'] },
  ],
  pinterest: [
    { day: 'Saturday', times: ['8:00 PM', '11:00 PM'] },
    { day: 'Sunday', times: ['9:00 PM'] },
  ],
};

// Trending hashtags by category (simplified - in production would fetch from APIs)
const TRENDING_HASHTAGS: Record<string, string[]> = {
  business: ['#Entrepreneur', '#BusinessTips', '#StartupLife', '#Leadership', '#Innovation'],
  marketing: ['#DigitalMarketing', '#ContentMarketing', '#SocialMedia', '#MarketingTips', '#GrowthHacking'],
  lifestyle: ['#LifestyleGoals', '#Motivation', '#SelfCare', '#WellnessJourney', '#DailyInspiration'],
  technology: ['#TechNews', '#AI', '#Innovation', '#FutureTech', '#DigitalTransformation'],
  health: ['#HealthyLiving', '#Wellness', '#Fitness', '#Mindfulness', '#HealthTips'],
  education: ['#Learning', '#Education', '#StudyTips', '#KnowledgeIsPower', '#OnlineLearning'],
  entertainment: ['#Entertainment', '#Trending', '#Viral', '#PopCulture', '#FunContent'],
};

// Analyze best time to post
function analyzeTiming(platforms: string[], scheduledAt?: Date | null): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (!scheduledAt) {
    // No scheduled time - suggest best times
    const bestTimes = platforms
      .map(platform => {
        const times = PLATFORM_BEST_TIMES[platform];
        if (!times || times.length === 0) return null;
        const best = times[0];
        return `${platform}: ${best.day}s at ${best.times.join(' or ')}`;
      })
      .filter(Boolean);

    if (bestTimes.length > 0) {
      suggestions.push({
        type: 'timing',
        title: 'Optimal Posting Times',
        description: `Best engagement times: ${bestTimes.join(' • ')}`,
        priority: 'high',
        icon: '⏰',
      });
    }
  } else {
    // Check if scheduled time is optimal
    const day = scheduledAt.toLocaleDateString('en-US', { weekday: 'long' });
    const time = scheduledAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const suboptimalPlatforms = platforms.filter(platform => {
      const bestTimes = PLATFORM_BEST_TIMES[platform];
      if (!bestTimes) return false;

      return !bestTimes.some(t =>
        t.day === day && t.times.some(bestTime => {
          // Check if within 2 hours of best time
          const bestHourMatch = bestTime.match(/\d+/);
          const schedHourMatch = time.match(/\d+/);
          if (!bestHourMatch || !schedHourMatch) return false;
          const bestHour = parseInt(bestHourMatch[0]);
          const schedHour = parseInt(schedHourMatch[0]);
          return Math.abs(bestHour - schedHour) <= 2;
        })
      );
    });

    if (suboptimalPlatforms.length > 0) {
      suggestions.push({
        type: 'timing',
        title: 'Consider Rescheduling',
        description: `${day} ${time} may not be optimal for ${suboptimalPlatforms.join(', ')}. Check recommended times for better engagement.`,
        priority: 'medium',
        icon: '⏰',
      });
    }
  }

  return suggestions;
}

// Suggest hashtags based on content
function suggestHashtags(content: string, platforms: string[]): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const contentLower = content.toLowerCase();

  // Detect content category
  let category = 'general';
  if (contentLower.includes('business') || contentLower.includes('entrepreneur') || contentLower.includes('startup')) {
    category = 'business';
  } else if (contentLower.includes('marketing') || contentLower.includes('social media')) {
    category = 'marketing';
  } else if (contentLower.includes('tech') || contentLower.includes('ai') || contentLower.includes('innovation')) {
    category = 'technology';
  } else if (contentLower.includes('health') || contentLower.includes('wellness') || contentLower.includes('fitness')) {
    category = 'health';
  } else if (contentLower.includes('lifestyle') || contentLower.includes('motivation')) {
    category = 'lifestyle';
  }

  // Get trending hashtags for category
  const hashtags = TRENDING_HASHTAGS[category] || [];

  if (hashtags.length > 0) {
    // Platform-specific hashtag recommendations
    const instagramCount = platforms.includes('instagram') ? '20-30' : '';
    const twitterCount = platforms.includes('twitter') ? '1-2' : '';
    const linkedinCount = platforms.includes('linkedin') ? '3-5' : '';

    let hashtagAdvice = 'Suggested hashtags: ' + hashtags.slice(0, 5).join(' ');

    if (instagramCount || twitterCount || linkedinCount) {
      hashtagAdvice += '\n\nOptimal counts: ';
      const counts = [
        instagramCount && `Instagram: ${instagramCount}`,
        twitterCount && `Twitter: ${twitterCount}`,
        linkedinCount && `LinkedIn: ${linkedinCount}`,
      ].filter(Boolean);
      hashtagAdvice += counts.join(', ');
    }

    suggestions.push({
      type: 'hashtag',
      title: 'Trending Hashtags',
      description: hashtagAdvice,
      priority: 'high',
      icon: '#️⃣',
    });
  }

  return suggestions;
}

// Analyze content for optimization
function analyzeContent(content: string, platforms: string[]): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const wordCount = content.split(/\s+/).length;
  const charCount = content.length;
  // Simple emoji detection - check for common emoji characters
  const emojiRegex = /[\u2600-\u27BF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  const hasEmoji = emojiRegex.test(content);
  const hasQuestion = content.includes('?');
  const hasCallToAction = /\b(click|tap|swipe|comment|share|follow|learn more|shop now|sign up|join|download)\b/i.test(content);

  // Character count warnings
  if (platforms.includes('twitter') && charCount > 240) {
    suggestions.push({
      type: 'content',
      title: 'Twitter Length Warning',
      description: `Your post is ${charCount} characters. Twitter works best under 240 characters (current limit is 280).`,
      priority: 'high',
      icon: '⚠️',
    });
  }

  // Engagement tips
  if (!hasQuestion && !hasCallToAction) {
    suggestions.push({
      type: 'engagement',
      title: 'Boost Engagement',
      description: 'Consider adding a question or call-to-action to encourage audience interaction.',
      priority: 'medium',
      icon: '💬',
    });
  }

  if (!hasEmoji && (platforms.includes('instagram') || platforms.includes('facebook'))) {
    suggestions.push({
      type: 'engagement',
      title: 'Add Visual Interest',
      description: 'Posts with emojis tend to get 47% more engagement on Instagram and Facebook.',
      priority: 'low',
      icon: '😊',
    });
  }

  // Platform-specific tips
  if (platforms.includes('linkedin')) {
    if (wordCount < 50) {
      suggestions.push({
        type: 'platform',
        title: 'LinkedIn Best Practice',
        description: 'LinkedIn posts perform best with 150-300 words. Consider expanding your content for better engagement.',
        priority: 'medium',
        icon: '💼',
      });
    }
  }

  if (platforms.includes('instagram') && !content.includes('\n')) {
    suggestions.push({
      type: 'platform',
      title: 'Instagram Formatting',
      description: 'Use line breaks to improve readability on Instagram. First 125 characters are shown before "more".',
      priority: 'low',
      icon: '📸',
    });
  }

  if (platforms.includes('twitter') && charCount < 100) {
    suggestions.push({
      type: 'platform',
      title: 'Twitter Sweet Spot',
      description: 'Tweets between 100-280 characters get the most engagement. Consider adding more context.',
      priority: 'low',
      icon: '🐦',
    });
  }

  return suggestions;
}

// Main suggestion engine
export function generateSuggestions(
  content: string,
  platforms: string[],
  scheduledAt?: Date | null,
  tone?: string | null
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Timing suggestions
  suggestions.push(...analyzeTiming(platforms, scheduledAt));

  // Hashtag suggestions
  suggestions.push(...suggestHashtags(content, platforms));

  // Content optimization
  suggestions.push(...analyzeContent(content, platforms));

  // Tone-specific suggestions
  if (tone === 'professional' && content.toLowerCase().includes('lol')) {
    suggestions.push({
      type: 'content',
      title: 'Tone Mismatch',
      description: 'Your content includes casual language that may not match the professional tone setting.',
      priority: 'medium',
      icon: '🎯',
    });
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return suggestions;
}

// Get platform-specific tips
export function getPlatformTips(platform: string): string[] {
  const tips: Record<string, string[]> = {
    facebook: [
      'Posts with images get 2.3x more engagement',
      'Videos get 59% more engagement than other post types',
      'Ask questions to boost comments by 92%',
      'Post when your audience is most active (check Insights)',
    ],
    instagram: [
      'First 125 characters are visible before "more" button',
      'Use 20-30 hashtags for maximum reach',
      'Post Stories consistently (1-7 per day)',
      'Carousel posts get 1.4x more reach than single images',
    ],
    twitter: [
      'Tweets with images get 150% more retweets',
      'Keep tweets under 100 characters for best engagement',
      'Use 1-2 hashtags maximum',
      'Tweet 3-5 times per day for optimal reach',
    ],
    linkedin: [
      'Posts with 150-300 words get the most engagement',
      'Include 3-5 relevant hashtags',
      'Ask for opinions to drive comments',
      'Native videos get 5x more engagement than YouTube links',
    ],
    tiktok: [
      'First 3 seconds are crucial - hook viewers immediately',
      'Use trending sounds for better discoverability',
      'Post 1-4 times per day',
      'Engage with comments within first hour',
    ],
    youtube: [
      'Titles should be 60 characters or less',
      'Use 3-5 keyword-rich tags',
      'Thumbnails drive 90% of clicks',
      'First 15 seconds determine if viewers stay',
    ],
    pinterest: [
      'Vertical images (2:3 ratio) perform best',
      'Include keyword-rich descriptions',
      'Pin consistently (5-30 pins per day)',
      'Fresh content gets priority in feed',
    ],
  };

  return tips[platform] || [];
}
