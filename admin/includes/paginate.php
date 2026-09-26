<?php
/**
 * Paging for the admin lists.
 *
 * The catalogue, the orders and the customers all loaded every row. That is
 * fine at twenty products and not at two thousand, and the browser pays for it
 * on a phone. One helper so the three pages behave identically.
 */

const ADMIN_PER_PAGE = 20;

/**
 * @return array{page:int, perPage:int, offset:int, total:int, pages:int}
 */
function paginate(PDO $pdo, string $countSql, array $params = [], int $perPage = ADMIN_PER_PAGE): array
{
    $stmt = $pdo->prepare($countSql);
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    $pages = max(1, (int)ceil($total / $perPage));
    // a stale ?page= from a filter change must not land on an empty list
    $page = max(1, min($pages, (int)($_GET['page'] ?? 1)));

    return [
        'page' => $page,
        'perPage' => $perPage,
        'offset' => ($page - 1) * $perPage,
        'total' => $total,
        'pages' => $pages,
    ];
}

/** Renders the pager, keeping whatever filters are already in the query. */
function pager(array $p, string $label = 'éléments'): void
{
    if ($p['pages'] <= 1) {
        printf('<p class="pager-count">%d %s</p>', $p['total'], h($label));
        return;
    }

    $link = function (int $n): string {
        $q = $_GET;
        $q['page'] = $n;
        return '?' . http_build_query($q);
    };

    echo '<nav class="pager" aria-label="Pagination">';
    printf('<span class="pager-count">%d %s</span>', $p['total'], h($label));

    if ($p['page'] > 1) {
        printf('<a class="pager-btn" href="%s" rel="prev">&larr;</a>', h($link($p['page'] - 1)));
    }

    // first, last, and a window around the current page
    $shown = [];
    foreach (range(1, $p['pages']) as $n) {
        if ($n === 1 || $n === $p['pages'] || abs($n - $p['page']) <= 1) $shown[] = $n;
    }

    $prev = 0;
    foreach ($shown as $n) {
        if ($prev && $n - $prev > 1) echo '<span class="pager-gap">…</span>';
        if ($n === $p['page']) {
            printf('<span class="pager-btn on" aria-current="page">%d</span>', $n);
        } else {
            printf('<a class="pager-btn" href="%s">%d</a>', h($link($n)), $n);
        }
        $prev = $n;
    }

    if ($p['page'] < $p['pages']) {
        printf('<a class="pager-btn" href="%s" rel="next">&rarr;</a>', h($link($p['page'] + 1)));
    }
    echo '</nav>';
}
