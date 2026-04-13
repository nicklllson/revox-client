import { BookOpen, Briefcase, FolderOpen, Lightbulb } from 'lucide-react';

export const PURPOSE_OPTIONS = [
	{ value: 'study', label: 'Учёба', icon: BookOpen },
	{ value: 'business', label: 'Бизнес', icon: Briefcase },
	{ value: 'personal', label: 'Личное', icon: FolderOpen },
	{ value: 'other', label: 'Другое', icon: Lightbulb },
] as const;
