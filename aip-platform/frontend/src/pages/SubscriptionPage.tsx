import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface PricingTier {
    name: string;
    id: string;
    description: string;
    monthlyPrice: number | null;
    annualPrice: number | null;
    priceLabel?: string;
    features: string[];
    cta: string;
    popular?: boolean;
}

const tiers: PricingTier[] = [
    {
        name: 'Starter',
        id: 'starter',
        description: 'Perfect for getting started with ATS optimization.',
        monthlyPrice: 0,
        annualPrice: 0,
        features: [
            '3 resume analyses per month',
            'Basic ATS compatibility score',
            'Keyword matching insights',
            'PDF resume upload',
            'Community support',
        ],
        cta: 'Get Started Free',
    },
    {
        name: 'Pro',
        id: 'pro',
        description: 'Everything you need to land more interviews.',
        monthlyPrice: 19,
        annualPrice: 15,
        features: [
            'Unlimited resume analyses',
            'AI-powered resume rewrite',
            'Advanced skill gap analysis',
            'Multiple resume versions',
            'Priority email support',
            'Export optimized resumes',
            'Job description matching',
        ],
        cta: 'Upgrade to Pro',
        popular: true,
    },
    {
        name: 'Enterprise',
        id: 'enterprise',
        description: 'For teams and organizations at scale.',
        monthlyPrice: null,
        annualPrice: null,
        priceLabel: 'Custom',
        features: [
            'Everything in Pro',
            'Team workspaces & collaboration',
            'API access & integrations',
            'Custom branding',
            'Dedicated account manager',
            'SSO / SAML authentication',
            'SLA & priority support',
            'Custom reporting & analytics',
        ],
        cta: 'Contact Sales',
    },
];

const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const SubscriptionPage = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const { user } = useAuth();

    // TODO: Replace with real plan from DB/Supabase when backend is ready
    const currentPlanId = 'starter';

    const formatPrice = (tier: PricingTier) => {
        if (tier.priceLabel) return tier.priceLabel;
        const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
        if (price === 0) return 'Free';
        return `$${price}`;
    };

    return (
        <div className="subscription-page">
            {/* Header */}
            <div className="subscription-header">
                <h1>Choose Your Plan</h1>
                <p>
                    Unlock the full power of AI-driven resume optimization.
                    {user?.email && <span className="subscription-email"> Logged in as <strong>{user.email}</strong></span>}
                </p>

                {/* Billing Toggle */}
                <div className="pricing-toggle-wrap">
                    <span className={!isAnnual ? 'pricing-toggle-label active' : 'pricing-toggle-label'}>Monthly</span>
                    <button
                        className="pricing-toggle"
                        onClick={() => setIsAnnual(!isAnnual)}
                        aria-label="Toggle billing period"
                        id="billing-toggle"
                    >
                        <span className={`pricing-toggle-knob ${isAnnual ? 'annual' : ''}`} />
                    </button>
                    <span className={isAnnual ? 'pricing-toggle-label active' : 'pricing-toggle-label'}>
                        Annual
                        <span className="pricing-save-badge">Save 20%</span>
                    </span>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="pricing-grid">
                {tiers.map((tier) => {
                    const isCurrent = tier.id === currentPlanId;
                    return (
                        <div
                            key={tier.name}
                            className={`card pricing-card ${tier.popular ? 'pricing-card--popular' : ''} ${isCurrent ? 'pricing-card--current' : ''}`}
                            id={`plan-${tier.name.toLowerCase()}`}
                        >
                            {isCurrent && <div className="pricing-badge pricing-badge--current">Current Plan</div>}
                            {!isCurrent && tier.popular && <div className="pricing-badge">Most Popular</div>}

                            <h3 className="pricing-card-name">{tier.name}</h3>
                            <p className="pricing-card-desc">{tier.description}</p>

                            <div className="pricing-card-price">
                                <span className="pricing-amount">{formatPrice(tier)}</span>
                                {tier.monthlyPrice !== null && tier.monthlyPrice > 0 && (
                                    <span className="pricing-period">/{isAnnual ? 'mo, billed annually' : 'month'}</span>
                                )}
                            </div>

                            <button
                                className={`btn ${isCurrent ? 'btn-secondary' : tier.popular ? 'btn-primary' : 'btn-secondary'} w-full pricing-cta`}
                                id={`cta-${tier.name.toLowerCase()}`}
                                disabled={isCurrent}
                            >
                                {isCurrent ? '✓ Current Plan' : tier.cta}
                            </button>

                            <ul className="feature-list">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="feature-list-item">
                                        <CheckIcon />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* FAQ / Trust section */}
            <div className="subscription-footer-note">
                <p>All plans include a <strong>14-day money-back guarantee</strong>. No credit card required for Starter.</p>
                <p className="subscription-fine-print">Prices in USD. Enterprise pricing is customized to your team size and needs.</p>
            </div>
        </div>
    );
};
