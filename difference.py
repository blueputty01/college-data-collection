with open('initial.txt', 'r') as f:
    initial = f.read().splitlines()
    with open('current.txt', 'r') as f:
        current = f.read().splitlines()
        print(*list(set(initial) - set(current)), sep="\n")
