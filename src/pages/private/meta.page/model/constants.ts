import { BookOpen, Briefcase, FolderOpen, Lightbulb } from 'lucide-react';

export const PURPOSE_OPTIONS = [
	{ value: 'study', label: 'Learning', icon: BookOpen },
	{ value: 'business', label: 'Business', icon: Briefcase },
	{ value: 'personal', label: 'Personal', icon: FolderOpen },
	{ value: 'other', label: 'Other', icon: Lightbulb },
] as const;
