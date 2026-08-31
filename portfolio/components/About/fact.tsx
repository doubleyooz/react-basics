import React from 'react';

export const Fact: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    return (
        <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                {label}
            </dt>
            <dd className="mt-1 text-sm font-medium">{value}</dd>
        </div>
    );
};

