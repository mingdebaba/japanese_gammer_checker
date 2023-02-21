#include <stdio.h>
main()
{
    int a;
    char r[] = "abcd";
    char *q = "abcd";
    char *p;
    p = r;

    //printf("%d",*(p+2));
    puts(&r[2]);
    puts(p+2);
    puts(q+2);

}
