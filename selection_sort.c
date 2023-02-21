#include <stdio.h>
void selection_sort(int a[], int len)
{
    int i ,j,temp;

    for(i=0;i<len-1;i++)
    {
        int min = i;//think its min
        for (j= i + 1; j< len;j++)  // 访问未排序的元素
        {
            if (a[j] < a[min])
            {
                min = j;//记录最小值
            }
        }
        if(min != i)
        {
            temp = a[min];
            a[min]= a[i];
            a[i]= temp;
        }

    }

}


void insertion_sort(int arr[],int len){
    int i,j,temp;
    for(i=1;i<len;i++){
        temp = arr[i];
        for(j=i;j>0 && arr[j-1]>temp;j--)
                arr[j]=arr[j-1];
        arr[j]=temp;
    }
}

int main() {
    int arr[] = { 22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 35, 9, 70 };
    int len = (int) sizeof(arr) / sizeof(*arr);
    insertion_sort(arr, len);
    int i;
    for (i = 0; i < len; i++)
        printf("%d ", arr[i]);
    return 0;
}