// Tanstack QUery key 전용 유틸 (추가 예정)

export const lpKeys = {
    all: ['lps'] as const,
    list: (query?: unknown) => [...lpKeys.all, 'list', query] as const,
    // byUser:
    // mine:
    // byTag:
    // detail:
}